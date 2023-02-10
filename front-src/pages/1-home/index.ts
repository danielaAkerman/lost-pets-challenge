// import { state } from "../../state";

export function initPageHome(root) {
  const div = document.createElement("div");
  div.innerHTML = `
  <text-comp size="fs-1" weight="fw-bold">HOLISHHHH hola como estas?</text-comp>
  <text-comp size="fs-4" weight="fw-bold">HOLISHHHH hola como estas?</text-comp>
  <text-comp size="fs-1" weight="fw-normal">HOLISHHHH hola como estas?</text-comp>
  <text-comp size="fs-4" weight="fw-normal">HOLISHHHH hola como estas?</text-comp>
  <text-comp weight="fw-normal">HOLISHHHH hola como estas?</text-comp>
  <text-comp weight="fw-normal">HOLISHHHH hola como estas?</text-comp>
  <button-comp visual="link" id="button">HOLA</button-comp>
  <button-comp visual="primary" id="button">HOLA</button-comp>
 
  `;
  const button = div.querySelector("#button") as HTMLElement;


  button.addEventListener("click", () => {
    root.goTo("/2");
  });

//   const style = document.createElement("style");
//   style.textContent = ``;
//   div.appendChild(style);

  return div;
}