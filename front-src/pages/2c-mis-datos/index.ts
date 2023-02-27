import { state } from "../../state";

export function initPageMisDatos(root) {
  const div = document.createElement("div");

  div.innerHTML = `
  <h1 class="fs-1">Mis Datos</h1>

  <form class="form-mis-datos">

  <div class="mb-3">
    <label for="Name" class="form-label">Nombre</label>
    <input class="form-control" id="Name" aria-describedby="nameHelp">
  </div>

  <div class="mb-3">
    <label for="Email" class="form-label">Email</label>
    <input type="email" class="form-control" id="Email" aria-describedby="emailHelp">
  </div>

  <div class="mb-3">
    <label for="Contraseña" class="form-label">Contraseña</label>
    <input type="password" class="form-control" id="Contraseña">
  </div>

  <div class="mb-3">
    <label for="Repetir-Contraseña" class="form-label">Repetir contraseña</label>
    <input type="password" class="form-control" id="Repetir-Contraseña">
  </div>

  <button type="submit" class="btn btn-primary">Actualizar mis datos</button>
  
  </form>
  `;

  return div;
}
