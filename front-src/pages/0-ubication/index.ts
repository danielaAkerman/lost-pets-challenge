import { Router } from "@vaadin/router";
import { state } from "../../state";
const search = require("../../assets/img/search.jpeg");

customElements.define(
  "page-ubication",
  class extends HTMLElement {
    connectedCallback() {
      this.render();
    }

    render() {
      this.innerHTML = `
    <div class="img-container">
      <img src=${search} class="img-fluid">
    </div>
    <p class="">Para continuar, necesitamos conocer tu ubicación</p>
    <button class="btn btn-success" id="button">Aceptar</button>`;

      const button = this.querySelector("#button") as HTMLElement;

      button.addEventListener("click", () => {
        navigator.geolocation.getCurrentPosition((e) => {
          const ubication = {
            lat: e.coords.latitude as any,
            lng: e.coords.longitude as any,
          };
          state.setMyUbication(ubication);

          Router.go("pets");
        });
      });
    }
  }
);
