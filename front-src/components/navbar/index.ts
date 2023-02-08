customElements.define(
  "nav-comp",
  class extends HTMLElement {
    constructor() {
      super();
      this.render();
    }
    render() {
      this.innerHTML = `
    <nav class="navbar navbar-dark bg-dark fixed-top">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Lost Pets</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasDarkNavbar"
          aria-controls="offcanvasDarkNavbar"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="offcanvas offcanvas-end text-bg-dark"
          tabindex="-1"
          id="offcanvasDarkNavbar"
          aria-labelledby="offcanvasDarkNavbarLabel"
        >
          <div class="offcanvas-header">
            <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li class="nav-item">
                <div class="nav-link" style="cursor: pointer" id="datos">Mis datos</div>
              </li>
              <li class="nav-item">
                <div class="nav-link" style="cursor: pointer">
                  Mis mascotas reportadas
                </div>
              </li>
              <li class="nav-item">
                <div class="nav-link" style="cursor: pointer">
                  Reportar mascotas
                </div>
              </li>
              <li class="nav-item">
                <div class="nav-link" style="cursor: pointer">
                  Cerrar sesión
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>`;

      const datos = this.querySelector("#datos");
      datos!.addEventListener("click", (e) => console.log("CLICK EN DATOS"));
    }
  }
);
