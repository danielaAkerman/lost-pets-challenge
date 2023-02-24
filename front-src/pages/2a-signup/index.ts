import { state } from "../../state";

export function initPageSignUp(root) {
  const div = document.createElement("div");

  div.innerHTML = `
  <h1 class="fs-1">Crear cuenta</h1>
  `;

  return div;
}
