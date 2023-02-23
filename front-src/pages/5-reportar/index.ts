// import { state } from "../../state";

export function initPageReport(root) {
  const div = document.createElement("div");
  div.innerHTML = `
  <form class="search-form">
    <input name="q" type="search" />
    <button class="button btn btn-success">Buscar</button>
  </form>
  <div id="map" style="width: 100%; height: 100%"></div>
   
    `;


  //   const style = document.createElement("style");
  //   style.textContent = ``;
  //   div.appendChild(style);

  return div;
}
