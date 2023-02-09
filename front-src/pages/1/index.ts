// import { state } from "../../state";

export function initPageWelcome(root) {
  const div = document.createElement("div");
  div.innerHTML = `

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