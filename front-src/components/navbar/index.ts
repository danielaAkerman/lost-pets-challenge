import { initRouter } from "../../router";
import { state } from "../../state";

import {initPageUbication} from "../../pages/0-ubication";
import {initPageWelcome} from "../../pages/1-welcome";
import {initPageMisDatos} from "../../pages/2c-mis-datos";
import {initPagePublicar} from "../../pages/3a-publicar";
import {initPageMisMascotas} from "../../pages/3b-mis-mascotas";

customElements.define(
  "nav-comp",
  class extends HTMLElement {
    constructor() {
      super();
      this.render();
    }
    render() {
      this.innerHTML = `
    <nav class="navbar fixed-top">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Lost Pets</a>
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
              data-bs-dismiss="offcanvas"
              aria-label="Close"
              >
                <div class="nav-link" style="cursor: pointer" id="mis-datos">Mis datos</div>
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
                <div class="nav-link" style="cursor: pointer" id="reportar-datos">
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
            </ul>
          </div>
        </div>
      </div>
    </nav>`;

      const root = document.querySelector(".root") as HTMLElement;
      // initRouter(root);

      const brand = this.querySelector(".navbar-brand");
      brand!.addEventListener("click", (e) => {
        // console.log("A inicio");
        history.pushState({}, "", "/welcome");
        if (root.firstChild) {
          root.firstChild.remove();
        }
        root.appendChild(initPageWelcome(root));
      });

      const datos = this.querySelector("#mis-datos");
      datos!.addEventListener("click", (e) => {
        // console.log("A mis datos");
        history.pushState({}, "", "/mis-datos");
        if (root.firstChild) {
          root.firstChild.remove();
        }
        root.appendChild(initPageMisDatos(root));
      });

      const mascotas = this.querySelector("#mis-mascotas");
      mascotas!.addEventListener("click", (e) => {
        // console.log("A mis mascotas perdidas");
        history.pushState({}, "", "/mis-mascotas");
        if (root.firstChild) {
          root.firstChild.remove();
        }
        root.appendChild(initPageMisMascotas(root));
      });

      const reportar = this.querySelector("#reportar-datos");
      reportar!.addEventListener("click", (e) => {
        // console.log("A reportar");
        history.pushState({}, "", "/reportar");
        if (root.firstChild) {
          root.firstChild.remove();
        }
        root.appendChild(initPagePublicar(root));
      });

      const cerrarSesion = this.querySelector("#cerrar-sesion");
      cerrarSesion!.addEventListener("click", (e) => {
        state.logOut()
        // console.log("A reportar");
        history.pushState({}, "", "/");
        if (root.firstChild) {
          root.firstChild.remove();
        }
        root.appendChild(initPageUbication(root));
      });
    }
  }
);
