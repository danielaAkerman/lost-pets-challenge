customElements.define(
  "text-comp",
  class extends HTMLElement {
    constructor() {
      super();
      this.render();
    }
    render() {
      const text = this.textContent;
      const size = this.getAttribute("size") || ""; // Tamaño fs-1, fs-4
      const weight = this.getAttribute("weight") || ""; // fw-bold, fw-normal

      this.innerHTML = `
        <p class="${size} ${weight} text-center">${text}</p>
        `;
    }
  }
);
