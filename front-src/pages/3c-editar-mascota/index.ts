import { state } from "../../state";

export function initPageEditarMascota(root) {
  const div = document.createElement("div");

  div.innerHTML = `
  <h1 class="fs-1">Editar Mascota</h1>
  `;

  return div;
}
