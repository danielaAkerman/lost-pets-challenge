const url = process.env.url;

export const state = {
  data: {
    email: "",
    fullname: "",
    password: "",
    token: "",
  },
  listeners: [],

  getState() {
    return this.data;
  },

  setState(newState) {
    this.data = newState;
    console.log("State:", this.data);

    for (const call of this.listeners) {
      call(newState);
    }
  },

  subscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },

  setEmail(email, root) {
    const currentState = state.getState();
    currentState.email = email;
    // VER SI ESTE MAIL EXISTE

    fetch(url + "/check-email", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data) {
          // SI EXISTE REDIRIGIMOS A PASSWORD
          currentState.fullname = data.fullname;
          state.setState(currentState);
          root.goTo("/password");
        } else {
          state.setState(currentState); // Igual guarda el mail
          // SI NO EXISTE REDIRIGIMOS A MIS DATOS PARA PEDIRLE nombre, pass y repet pass
          root.goTo("/mis-datos");
        }
      });
  },

  getToken(password, root) {
    // sing in - Ya sé el mail, el fullname, y ahora tmb la password
    const currentState = state.getState();
    const { email } = currentState;

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
        console.log("Se hizo sign-in:", data);
        currentState.token = data.token;
        this.setState(currentState);
      });
  },

  getAuth(values, root) {
    const currentState = state.getState();
    const { email } = currentState;
    const { fullname, password } = values;
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
};
