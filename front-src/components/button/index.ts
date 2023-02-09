customElements.define(
    "button-comp",
    class extends HTMLElement {
      constructor() {
        super();
        this.render();
      }
      render() {
        const text = this.textContent
        const visual = this.getAttribute("visual");
        // primary, secondary, success, link

        this.innerHTML = `
        <button type="button" class="btn btn-${visual}">${text}</button>
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
  