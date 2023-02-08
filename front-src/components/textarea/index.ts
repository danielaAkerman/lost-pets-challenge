customElements.define(
  "textarea-comp",
  class extends HTMLElement {
    constructor() {
      super();
      this.render();
    }
    render() {
      const placeholder = this.getAttribute("placeholder");
      const name = this.getAttribute("name");

      this.innerHTML = `
        <textarea class="form-control mb-3" placeholder=${placeholder} name=${name}></textarea>`;

      // const datos = this.querySelector("#datos");
      // datos!.addEventListener("click", (e) => console.log("CLICK EN DATOS"));
    }
  }
);
