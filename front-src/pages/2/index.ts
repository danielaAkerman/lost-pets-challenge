// import { state } from "../../state";

export function otraPage(root) {
    const div = document.createElement("div");
    div.innerHTML = `
  
    <button-comp visual="success" id="button">VOLVER</button-comp>
   
    `;
    const button = div.querySelector("#button") as HTMLElement;
  
  
    button.addEventListener("click", () => {
      root.goTo("/");
    });
  
  //   const style = document.createElement("style");
  //   style.textContent = ``;
  //   div.appendChild(style);
  
    return div;
  }