import { state } from "../../state";
import { initPageWelcome } from "../1-welcome";
const search = require("../../assets/img/search.jpeg");

export function initPageUbication(root) {
  const div = document.createElement("div");

  div.innerHTML = `
  <div class="img-container">
    <img src=${search} class="img-fluid">
  </div>
  <p class="">Para continuar, necesitamos conocer tu ubicación</p>
  <button class="btn btn-success" id="button">Aceptar</button>`;

  const button = div.querySelector("#button") as HTMLElement;

  button.addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition((e) => {
      const ubication = {
        lat: e.coords.latitude as any,
        lng: e.coords.longitude as any,
      };
      state.setMyUbication(ubication);

      history.pushState({}, "", "/welcome");
      if (root.firstChild) {
        root.firstChild.remove();
      }

      root.appendChild(initPageWelcome(root));
    });
  });

  return div;
}
