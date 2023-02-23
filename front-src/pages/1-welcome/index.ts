import { state } from "../../state";

export function initPageHome(root) {
  const div = document.createElement("div");

  const htmlAutorizacion= `
  <h1 class="fs-1">LostPets</h1>
  <p class="">Para continuar, necesitamos conocer tu ubicación</p>
  <button class="btn btn-success">Aceptar</button>`

  const htmlMascotas=`
  <h1 class="fs-1">Mascotas perdidas cerca tuyo</h1>

  <div class="results" id="results"></div>

  <template id="template">
    <div class="card" style="width: 18rem;">
      <img src="..." class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Bobby</h5>
        <p class="card-text">Córdoba</p>
        <button class="btn btn-warning">¿Lo viste?</button>
      </div>
    </div>
  </template>
  `

  div.innerHTML = "";
  const button = div.querySelector("#button") as HTMLElement;
  const container = div.querySelector(".autorizacion-container") as HTMLElement;

  button.addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition((e) => {
      const ubication = {
        lat: e.coords.latitude as any,
        lng: e.coords.longitude as any,
      };
      state.setUbication(ubication);
      // localStorage.setItem("lng", lng);
      // localStorage.setItem("lat", lat);

    });
    container.innerHTML = `
    <template id="result-item-template">
    <card-comp class="card-comp"
    src="" 
    alt="" 
    nombre="" 
    lugar="">
    </card-comp>
    </template>
    `;
  });

  return div;
}