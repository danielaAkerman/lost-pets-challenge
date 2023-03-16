import { state } from "../../state";
import { Router } from "@vaadin/router";

customElements.define(
  "page-mis-mascotas",
  class extends HTMLElement {
    connectedCallback() {
      this.render();
    }

    render() {
      const currentState = state.getState();

      this.innerHTML = `
      <h1 class="fs-1">Mis Mascotas</h1>

  
      <div class="results" id="results"></div>
    
      <template id="template">
    
        <div class="card mb-3" style="width: 18rem;">
          <img src="" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title"></h5>
            <p class="card-text"></p>
            <button class="btn btn-warning mb-3" id="edit_pet" pet_id="" >
              Editar
            </button>
    
            <button class="btn btn-danger mb-3" id="delete_pet" pet_id="" >
              Eliminar
            </button>
          </div>
        </div>
    
        </template>
    
    `;

      const contenedor = this.querySelector(".results")! as any;
      const template = this.querySelector("#template");

      let counterB = 1;
      const intervalIdB = setInterval(() => {
        counterB--;
        if (counterB < 0) {
          clearInterval(intervalIdB);

          state.mostrarMisMascotas(contenedor, template);

          // Agrego listenners Botón Editar y Eliminar
          let counter = 1;
          const intervalId = setInterval(() => {
            counter--;
            if (counter < 0) {
              clearInterval(intervalId);
              const items = contenedor.children;
              for (const i of items) {
                const editButton = i.querySelector("#edit_pet")! as any;

                editButton.addEventListener("click", (e) => {
                  const pet_id = e.target.getAttribute("pet_id");
                  currentState.editPetId = pet_id;
                  state.setState(currentState);
                  Router.go("editar-mascota");
                  // state.irAEditarMascota(pet_id);
                });

                const deleteButton = i.querySelector("#delete_pet")! as any;

                deleteButton.addEventListener("click", (e) => {
                  const pet_id = e.target.getAttribute("pet_id");
                  state.eliminarMascota(pet_id);
                  i.innerHTML = `Tu mascota ya no está publicada`;
                });
              }
            }
          }, 1000);
        }
      }, 1000);
    }
  }
);
