customElements.define(
    "card-comp",
    class extends HTMLElement {
      constructor() {
        super();
        this.render();
      }
      render() {
        const src = this.getAttribute("src");
        const alt = this.getAttribute("alt");
        const nombre = this.getAttribute("nombre");
        const lugar = this.getAttribute("lugar");
        // primary, secondary, success, link

        this.innerHTML = `
      <div class="card" style="width: 18rem;">
        <img src=${src} class="card-img-top" alt=${alt}>
        <div class="card-body">
        <h5 class="card-title">${nombre}</h5>
        <p class="card-text text-uppercase">${lugar}</p>
        <button-comp visual="link" id="button">VER</button-comp>
        </div>
      </div>
`;
  
        // const datos = this.querySelector("#datos");
        // datos!.addEventListener("click", (e) => console.log("CLICK EN DATOS"));


        const style = document.createElement("style");
        style.textContent = `
          .btn{
            width: 100%;
          }
              `;

        this.appendChild(style);
      }
    }
  );
  