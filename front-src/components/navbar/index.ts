import { Router } from "@vaadin/router";
import { state } from "../../state";


customElements.define(
  "nav-comp",
  class extends HTMLElement {
    connectedCallback() {
      this.render();
      state.subscribe(()=>this.render())
    }
    // constructor() {
      //   super();
      // }
      
      render() {
      const currentState = state.getState();
      const userName = currentState.fullname || "";
      this.innerHTML = `
    <nav class="navbar fixed-top">
      <div class="container-fluid">

        <a class="navbar-brand" style="cursor:pointer">Lost Pets</a>

        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div
          class="offcanvas offcanvas-end"
          tabindex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Hola ${userName}</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">

            <li class="nav-item"
            data-bs-dismiss="offcanvas">

            </li>

              <li class="nav-item"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
              >
                <div class="nav-link" style="cursor: pointer" id="mis-datos">
                  Mis datos
                </div>
              </li>

              <li class="nav-item"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
              >
                <div class="nav-link" style="cursor: pointer" id="mis-mascotas">
                  Mis mascotas reportadas
                </div>
              </li>

              <li class="nav-item"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
              >
                <div class="nav-link" style="cursor: pointer" id="publicar-mascota">
                  Publicar mascota perdida
                </div>
              </li>
              <li class="nav-item"
              data-bs-dismiss="offcanvas"
              aria-label="Close">
                <div class="nav-link" style="cursor: pointer" id="cerrar-sesion">
                  Cerrar sesión
                </div>
              </li>
              <br>
              <br>
              <br>
              <br>
              <br>

            </ul>
          </div>
        </div>

      </div>
    </nav>`;

      const brand = this.querySelector(".navbar-brand");
      brand!.addEventListener("click", (e) => {
        if (sessionStorage.getItem("lat")) {
          Router.go("pets");
        } else if (!sessionStorage.getItem("lat")) {
          Router.go("ubication");
        }
      });

      const datos = this.querySelector("#mis-datos");
      datos!.addEventListener("click", (e) => {
        if (currentState.userId) {
          Router.go("mis-datos");
        } else if (!currentState.userId) {
          Router.go("login");
          currentState.nextRoute = "mis-datos";
          state.setState(currentState);
        }
      });

      const mascotas = this.querySelector("#mis-mascotas");
      mascotas!.addEventListener("click", (e) => {
        if (currentState.userId) {
          console.log("A mis mascotas perdidas");

          Router.go("mis-mascotas");
        } else if (!currentState.userId) {
          Router.go("login");
          currentState.nextRoute = "mis-mascotas";
          state.setState(currentState);
        }
      });

      const reportar = this.querySelector("#publicar-mascota");
      reportar!.addEventListener("click", (e) => {
        if (currentState.userId) {
          Router.go("publicar-mascota");
        } else if (!currentState.userId) {
          Router.go("login");
          currentState.nextRoute = "publicar-mascota";
          state.setState(currentState);
        }
      });

      const cerrarSesion = this.querySelector("#cerrar-sesion");
      cerrarSesion!.addEventListener("click", (e) => {
        state.logOut();
        Router.go("ubication");
        location.reload();
      });
    }
  }
);
