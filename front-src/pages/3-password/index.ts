// import { state } from "../../state";

export function initPagePassword(root) {
  const div = document.createElement("div");
  div.innerHTML = `
  <text-comp size="fs-1" weight="fw-bold">Ingresar</text-comp>
  <br>
  <input-comp 
  type="password" 
  placeholder="Contraseña" 
  name="password">
  </input-comp>
  <br>
  <button-comp visual="primary" id="button">SIGIENTE</button-comp>
 
  `;
  const button = div.querySelector("#button") as HTMLElement;


  button.addEventListener("click", () => {
    console.log("RECIBIR PASSWORD")
    root.goTo("/");
  });

  return div;
}