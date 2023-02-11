// import { state } from "../../state";

export function initPageDatos(root) {
  const div = document.createElement("div");
  div.innerHTML = `
  <text-comp size="fs-1" weight="fw-bold">Mis datos</text-comp>
  <br>
  <br>
  <input-comp 
  type="text"
  placeholder="Nombre"
  name="fullname"></input-comp>
  <br>
  <input-comp 
  type="password" 
  placeholder="Contraseña" 
  name="password">
  </input-comp>
  <br>
  <input-comp 
  type="password" 
  placeholder="Repetir contraseña" 
  name="password">
  </input-comp>
  <br>
  <button-comp visual="primary" id="button">GUARDAR</button-comp>
 
  `;
  // const button = div.querySelector("#button") as HTMLElement;


  // button.addEventListener("click", () => {
  //   root.goTo("/2");
  // });

  return div;
}