// import { state } from "../../state";

export function otraPage(root) {
  const div = document.createElement("div");
  div.innerHTML = `
    <card-comp 
    src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGVycm98ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" 
    alt="foto" 
    nombre="Dani" 
    lugar="cordoba">
    </card-comp>
    <br>
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
