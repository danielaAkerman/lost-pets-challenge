import { state } from "../../state";

export function initPageMisDatos(root) {
  const div = document.createElement("div");

  div.innerHTML = `
  <h1 class="fs-1">Mis Datos</h1>
  `;

  return div;
}
