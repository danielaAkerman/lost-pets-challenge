import { state } from "../../state";

export function initPageEditarMascota(root) {
  const div = document.createElement("div");

  div.innerHTML = `
  <h1 class="fs-1">Editar Mascota</h1>

  
  <form class="form-editar">

  <div class="mb-3">
    <label for="Name" class="form-label">Nombre de tu mascota</label>
    <input class="form-control" id="Name" aria-describedby="nameHelp">
  </div>

  <div class="mb-3 cloudinary">

    <img class="profile-pic img-fluid" heigth="200" alt="Arrastra tu imagen aqui">
    <button  class="btn btn-success">Agregar foto</button>

  </div>

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

  return div;
}
