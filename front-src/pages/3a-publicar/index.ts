import { state } from "../../state";

export function initPagePublicar(root) {
  const div = document.createElement("div");

  div.innerHTML = `
  <h1 class="fs-1">Publicar Mascota</h1>
  `;

  return div;
}
