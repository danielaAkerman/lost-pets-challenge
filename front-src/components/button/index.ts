customElements.define(
    "button-comp",
    class extends HTMLElement {
      constructor() {
        super();
        this.render();
      }
      render() {
        const texto = this.textContent
        const visual = this.getAttribute("visual");
        // primary, secondary, success

        this.innerHTML = `
        <button type="button" class="btn btn-${visual}">${texto}</button>
`;
  
        // const datos = this.querySelector("#datos");
        // datos!.addEventListener("click", (e) => console.log("CLICK EN DATOS"));
      }
    }
  );
  