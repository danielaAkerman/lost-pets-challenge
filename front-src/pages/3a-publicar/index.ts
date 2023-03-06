import { state } from "../../state";
import { Dropzone } from "dropzone";

export function initPagePublicar(root) {
  const div = document.createElement("div");

  div.innerHTML = `
  <h1 class="fs-1">Publicar Mascota</h1>

  <form class="form-publicar">

  <div class="mb-3">
    <label for="Name" class="form-label">Nombre de tu mascota</label>
    <input class="form-control" id="Name" aria-describedby="nameHelp">
  </div>

  <div class="mb-3 dropzone"></div>

  <div class="mb-3 mapa-container">
    <h2>MAPA</h2>
  </div>

  <div class="mb-3">
    <label for="Ubicacion" class="form-label">Ubicación</label>
    <input class="form-control" id="Ubicacion">
  </div>

  <button type="submit" class="btn btn-primary">Publicar</button>
  
  </form>

  `;

  const divDrop = div.querySelector(".dropzone")!;
  let imageDataURL;
  const myDropzone = new Dropzone(divDrop, {
    url: "/falsa",
    clickable: true,
    autoProcessQueue: false,
    addRemoveLinks: true,
  });

  myDropzone.on("thumbnail", function (file) {
    // usando este evento pueden acceder al dataURL directamente
    imageDataURL = file.dataURL;
  });

  const petName = div.querySelector("#Name")! as any;
  const form = div.querySelector(".form-publicar")!;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const datosNewPet: any = {};

    datosNewPet.name = petName.value;
    datosNewPet.status = "lost";
    datosNewPet.imagen_data = imageDataURL;

    datosNewPet.last_location_lat= -31.4321021,
    datosNewPet.last_location_lng= -64.2318336,


    console.log({ datosNewPet });
    state.publicarMascota(datosNewPet)
  });

  return div;
}
