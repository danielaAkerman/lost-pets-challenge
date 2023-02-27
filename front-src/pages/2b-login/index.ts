import { state } from "../../state";

export function initPageLogIn(root) {
  const div = document.createElement("div");

  div.innerHTML = `
  <h1 class="fs-1">Log in</h1>
  `;

  return div;
}
