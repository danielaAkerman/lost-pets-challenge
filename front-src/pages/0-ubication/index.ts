import { state } from "../../state";

export function initPageUbication(root) {
  const div = document.createElement("div");

  const htmlAutorizacion = `
  <h1 class="fs-1">LostPets</h1>
  <p class="">Para continuar, necesitamos conocer tu ubicación</p>
  <button class="btn btn-success" id="button">Aceptar</button>`;

  div.innerHTML = htmlAutorizacion;

  const button = div.querySelector("#button") as HTMLElement;

  button.addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition((e) => {
      const ubication = {
        lat: e.coords.latitude as any,
        lng: e.coords.longitude as any,
      };
      state.setUbication(ubication);
    });

    root.goTo("/welcome");
  });

  return div;
}
