const url = process.env.url;

export const state = {
  data: {
    email: "",
    fullname: "",
    token: "",
    userId: "",
    ubication: {},
  },
  listeners: [],

  getState() {
    return this.data;
  },

  setState(newState) {
    this.data = newState;

    console.log(this.data);

    for (const call of this.listeners) {
      call(newState);
    }
  },

  init() {
    const currentState = this.getState();
    const userToken = localStorage.getItem("token");

    console.log(userToken);

    fetch(url + "/init/" + userToken, {})
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const { id, email, fullname } = data;

        currentState.userId = id;
        currentState.email = email;
        currentState.fullname = fullname;
        currentState.token = userToken;

        state.setState(currentState);
      });

    currentState.token = userToken;

    this.setState(currentState);
  },

  subscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },

  logIn(values, root, alerta) {
    const currentState = state.getState();

    const { email, password, check } = values;

    fetch(url + "/login", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.message) {
          console.log("ERROR", data);
          alerta.innerHTML = "ERROR";
          // this.setState(currentState);
        } else if (data) {
          console.log("Se hizo sign-in:", data);
          alerta.innerHTML = "";
          currentState.userId = data.user.id;
          currentState.fullname = data.user.fullname;
          currentState.email = email;
          currentState.token = data.token;
          this.setState(currentState);

          if (check) {
            localStorage.setItem("token", data.token.toString());
          }
        }
      });
  },

  getToken(loginValues, root, alerta) {
    const currentState = state.getState();

    const { email, password, check } = loginValues;

    fetch(url + "/auth/token", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.message) {
          console.log("ERROR", data);
          alerta.innerHTML = "ERROR";
          this.setState(currentState);
        } else if (data.token) {
          console.log("Se hizo sign-in:", data);
          alerta.innerHTML = "OK LOG";
          currentState.email = email;
          currentState.token = data.token;
          this.setState(currentState);

          if (check) {
            localStorage.setItem("token", data.token.toString());
          }
        }
      });
  },

  getAuth(values, root) {
    const currentState = state.getState();

    const { email, fullname, password } = values;
    console.log("A autenticar user!");

    fetch(url + "/auth", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email, fullname, password }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("Se autenticó user:", data);
        // root.goTo(route);
      });
  },

  updateUser(values) {
    const currentState = state.getState();

    fetch(url + "/update-user/" + this.data.userId, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => {
        return res.json();
      })
      .then(() => {
        currentState.email = values.email;
        currentState.fullname = values.fullname;
        state.setState(currentState)
        console.log("DATOS ACTUALIZADOS");
      });
  },

  logOut() {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
    }
    this.data = "";
    console.log(this.data);
  },

  setMyUbication(ubication) {
    const currentState = state.getState();
    currentState.ubication = ubication;
    state.setState(currentState);
  },

  mostrarMascotasCercaTuyo(root, contenedor, template) {
    const currentState = state.getState();
    const { lat, lng } = currentState.ubication;
    fetch(url + "/pets-near-me" + "?lat=" + lat + "&lng=" + lng)
      .then((res) => {
        return res.json();
      })
      .then((results) => {
        contenedor.replaceChildren();

        for (let r of results) {
          const pet_id = template.content.querySelector(".selected_pet");
          pet_id.setAttribute("data-bs-pet_id", r.objectID);

          const pet_name = template.content.querySelector(".selected_pet");
          pet_name.setAttribute("data-bs-pet_name", r.name);

          const foto = template.content.querySelector(".card-img-top");
          foto.src =
            "https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80";
          // foto.src = r.thumbnail;

          const nombre = template.content.querySelector(".card-title");
          nombre.textContent = r.name;

          const ubicacion = template.content.querySelector(".card-text");
          ubicacion.textContent = "Córdoba";

          const clone = document.importNode(template.content, true);

          contenedor.appendChild(clone);
        }
      });
  },

  setReporte(reporte) {
    fetch(url + "/new-report", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(reporte),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data.message);
      });
  },

  mostrarMisMascotas(root, contenedor, template) {},
};
