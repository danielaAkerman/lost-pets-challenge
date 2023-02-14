const url = process.env.url;

export const state = {
  data: {
    email: "",
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
    state.setState(currentState);
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

          root.goTo("/password");
        } else {
          // SI NO EXISTE REDIRIGIMOS A MIS DATOS PARA PEDIRLE nombre, pass y repet pass
          root.goTo("/mis-datos");
        }
      });
  },

  setPassword(password, root) {
    const currentState = state.getState();


    // state.setState(currentState);


    this.getAuth(root);
  },

  getAuth(root) {
    const currentState = state.getState();
    const { email, password } = currentState;
  },
};
