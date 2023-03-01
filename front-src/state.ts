const url = process.env.url;

export const state = {
  data: {
    email: "",
    fullname: "",
    token: "",
    ubication: {},
  },
  listeners: [],

  getState() {
    return this.data;
  },

  setState(newState) {
    this.data = newState;

    for (const call of this.listeners) {
      call(newState);
    }
  },

  subscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },

  // setEmail(email, root) {
  //   const currentState = state.getState();
  //   currentState.email = email;
  //   // VER SI ESTE MAIL EXISTE

  //   fetch(url + "/check-email", {
  //     method: "post",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify({ email }),
  //   })
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       if (data) {
  //         // SI EXISTE REDIRIGIMOS A PASSWORD
  //         currentState.fullname = data.fullname;
  //         state.setState(currentState);
  //         root.goTo("/password");
  //       } else {
  //         state.setState(currentState); // Igual guarda el mail
  //         // SI NO EXISTE REDIRIGIMOS A MIS DATOS PARA PEDIRLE nombre, pass y repet pass
  //         root.goTo("/mis-datos");
  //       }
  //     });
  // },

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
