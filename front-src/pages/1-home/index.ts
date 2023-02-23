import { state } from "../../state";

export function initPageHome(root) {
  const div = document.createElement("div");
  div.innerHTML = `
  <text-comp size="fs-1" weight="fw-bold">Mascotas perdidas cerca tuyo</text-comp>
  <br>
  <div class="autorizacion-container">
    <text-comp size="fs-4" weight="fw-normal">Para ver las mascotas perdidas cerca tuyo necesitamos permiso para conocer tu ubicación</text-comp>
    <br>
    <button-comp visual="primary" id="button">DAR MI UBICACIÓN</button-comp>
  </div>
  `;
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
