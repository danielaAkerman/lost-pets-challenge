customElements.define(
  "input-comp",
  class extends HTMLElement {
    constructor() {
      super();
      this.render();
    }
    render() {
      const type = this.getAttribute("type");
      const placeholder = this.getAttribute("placeholder");
      const name = this.getAttribute("name");

      this.innerHTML = `
        <input type=${type} class="form-control mb-3" placeholder=${placeholder} name=${name} >`;

      // const datos = this.querySelector("#datos");
      // datos!.addEventListener("click", (e) => console.log("CLICK EN DATOS"));
    }
  }
);
