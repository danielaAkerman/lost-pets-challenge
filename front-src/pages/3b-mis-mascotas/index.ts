import { state } from "../../state";

export function initPageMisMascotas(root) {
  const div = document.createElement("div");

  div.innerHTML = `
  <h1 class="fs-1">Mis Mascotas</h1>

  
  <div class="results" id="results"></div>

  <template id="template">

    <div class="card mb-3" style="width: 18rem;">
      <img src="" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title"></h5>
        <p class="card-text"></p>
        <button class="btn btn-warning mb-3 edit_pet" data-bs-pet_id="">
          Editar
        </button>

        <button class="btn btn-danger mb-3 delete_pet" data-bs-pet_id="">
          Eliminar
        </button>
      </div>
    </div>

    </template>


  `;
  const contenedor = div.querySelector(".results");
  const template = div.querySelector("#template");

  state.mostrarMisMascotas(root, contenedor, template);




  return div;
}
