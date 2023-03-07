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
  const contenedor = div.querySelector(".results")! as any;
  const template = div.querySelector("#template");

  state.mostrarMisMascotas(root, contenedor, template);

  // Agrego listenners Botón Editar y Eliminar
  let counter = 1;
  const intervalIdB = setInterval(() => {
    counter--;
    if (counter < 0) {
      clearInterval(intervalIdB);
      const items = contenedor.children;
      for (const i of items) {
        const editButton = i.querySelector("#edit_pet")! as any;

        editButton.addEventListener("click", (e) => {
          const pet_id = e.target.getAttribute("pet_id");
          state.irAEditarMascota(root, pet_id);
        });

        const deleteButton = i.querySelector("#delete_pet")! as any;

        deleteButton.addEventListener('click', (e)=>{
          const pet_id = e.target.getAttribute("pet_id");
          state.eliminarMascota(root, pet_id);
        })
      }
    }
  }, 1000);

  return div;
}
