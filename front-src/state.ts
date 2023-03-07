import { initPageMisDatos } from "./pages/2c-mis-datos";
import { initPageMisMascotas } from "./pages/3b-mis-mascotas";
import { initPagePublicar } from "./pages/3a-publicar";
import { initPageEditarMascota } from "./pages/3c-editar-mascota";
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

  logIn(values, root, alerta, route) {
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
          console.log(route);

          // ROUTEO

          history.pushState({}, "", route);
          if (root.firstChild) {
            root.firstChild.remove();
          }

          if (route == "/mis-datos") {
            root.appendChild(initPageMisDatos(root));
          }
          if (route == "/mis-mascotas") {
            root.appendChild(initPageMisMascotas(root));
          }
          if (route == "/publicar-mascota") {
            root.appendChild(initPagePublicar(root));
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

  getAuth(values, root, confirmacion) {
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
        confirmacion.innerHTML = `El usuario fue creado exitosamente`;
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
        state.setState(currentState);
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
          foto.src = r.picture_url;
          // foto.src = r.thumbnail;

          const nombre = template.content.querySelector(".card-title");
          nombre.textContent = r.name;

          const ubicacion = template.content.querySelector(".card-text");
          ubicacion.textContent = r.ubication;

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

  mostrarMisMascotas(root, contenedor, template) {
    const currentState = state.getState();
    fetch(url + "/my-pets/" + currentState.userId)
      .then((res) => {
        return res.json();
      })
      .then((results) => {
        if (results.length == 0) {
          contenedor.innerHTML = `<h5 class="card-title">No tenés mascotas reportadas</h5>`;
        } else {
          contenedor.replaceChildren();

          for (let r of results) {
            const pet_id = template.content.querySelector("#edit_pet");
            pet_id.setAttribute("pet_id", r.id);

            const pet_id_delete = template.content.querySelector("#delete_pet");
            pet_id_delete.setAttribute("pet_id", r.id);

            const foto = template.content.querySelector(".card-img-top");
            foto.src = r.picture_url;
            // foto.src = r.thumbnail;

            const nombre = template.content.querySelector(".card-title");
            nombre.textContent = r.name;

            const ubicacion = template.content.querySelector(".card-text");
            ubicacion.textContent = r.ubication;

            const clone = document.importNode(template.content, true);

            contenedor.appendChild(clone);
          }
        }
      });
  },

  publicarMascota(datosNewPet) {
    const currentState = state.getState();
    datosNewPet.userId = currentState.userId;
    fetch(url + "/new-pet", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(datosNewPet),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      });
  },

  irAEditarMascota(root, pet_id) {
    // ROUTEO
    history.pushState({}, "", "/editar-mascota");
    if (root.firstChild) {
      root.firstChild.remove();
    }
    root.appendChild(initPageEditarMascota(root));

    // DB
    fetch(url + "/pet/" + pet_id)
      .then((res) => {
        return res.json();
      })
      .then((pet) => {
        console.log("La mascota a editar es:", pet);
        const nameInput = root.querySelector("#Name");
        nameInput.setAttribute("pet_id", pet_id);
        nameInput.value = pet.name;

        const ubicationInput = root.querySelector("#Ubicacion");
        ubicationInput.value = pet.ubication;

        const petPicture = root.querySelector(".pet-picture");
        petPicture.setAttribute("src", pet.picture_url);
      });
  },

  editarMascota(datos) {
    console.log("state:", datos);

    // Preparo body para update
    const sendBody: any = {};

    if (datos.imagen_data) {
      sendBody.imagen_data = datos.imagen_data;
    }
    if (datos.name) {
      sendBody.name = datos.name;
    }
    if (datos.ubication) {
      sendBody.ubication = datos.ubication;
    }
    if (datos.last_location_lat) {
      sendBody.last_location_lat = datos.last_location_lat;
    }
    if (datos.last_location_lng) {
      sendBody.last_location_lng = datos.last_location_lng;
    }
    fetch(url + "/edit-pet/" + datos.id, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(sendBody),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      });
  },

  eliminarMascota(root, pet_id) {},
};
