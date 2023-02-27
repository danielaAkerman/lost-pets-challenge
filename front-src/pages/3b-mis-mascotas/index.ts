import { state } from "../../state";

export function initPageMisMascotas(root) {
  const div = document.createElement("div");

  div.innerHTML = `
  <h1 class="fs-1">Mis Mascotas</h1>
  `;

  return div;
}
