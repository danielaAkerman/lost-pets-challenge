import { state } from "../../state";

export function initPageWelcome(root) {
  const currentState = state.getState();

  const div = document.createElement("div");

  div.innerHTML = `
  <h1 class="fs-1">Mascotas perdidas cerca tuyo</h1>

  <div class="results" id="results"></div>

  <template id="template">

    <div class="card mb-3" style="width: 18rem;">
      <img src="" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title"></h5>
        <p class="card-text"></p>
        <button 
        class="btn btn-warning selected_pet" 
        data-bs-toggle="modal" 
        data-bs-target="#exampleModal" 
        data-bs-pet_name=""
        data-bs-pet_id="" >
          ¿Lo viste?
        </button>
      </div>
    </div>

    </template>

    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel"></h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
  
            <form class="form">
  
              <div class="mb-3">
                <label for="name" class="form-label">Tu nombre:</label>
                <input class="form-control name" id="name" placeholder="Ingresá tu nombre">
              </div>
  
              <div class="mb-3">
                <label for="telefono" class="form-label">Tu teléfono:</label>
                <input class="form-control telefono" id="telefono" placeholder="Ingresá tu teléfono">
              </div>
  
              <div class="mb-3">
                <label for="mensaje" class="form-label">¿Dónde lo viste?</label>
                <textarea class="form-control mensaje" id="mensaje" rows="3"></textarea>
              </div>
  
              <button type="submit" class="btn btn-success" data-bs-dismiss="modal" aria-label="Close">Enviar</button>
          
            </form>
            
          </div>
        </div>
      </div>
    </div>
  `;
  const contenedor = div.querySelector(".results");
  const template = div.querySelector("#template");
  const myModal = div.querySelector(".modal")!;
  const form = div.querySelector(".form")!;

  myModal.addEventListener("shown.bs.modal", (e) => {
    const event = e as any;
    const button = event.relatedTarget;
    const petName = button.getAttribute("data-bs-pet_name");
    const petId = button.getAttribute("data-bs-pet_id");

    const modalTitle = myModal.querySelector(".modal-title")!;
    modalTitle.textContent = `Ayudanos a encontrar a ${petName}`;

    const inputReporterName = myModal.querySelector(".name")! as any;
    const inputReporterTelefono = myModal.querySelector(".telefono")! as any;
    const inputReporterMensaje = myModal.querySelector(".mensaje")! as any;

    form.addEventListener("submit", function formulario(e) {
      e.preventDefault();
      const reporte: any = {};

      reporte.reporter = inputReporterName.value;
      reporte.phone_number = inputReporterTelefono.value;
      reporte.message = inputReporterMensaje.value;
      reporte.pet_id = petId;

      state.setReporte(reporte);
      form.removeEventListener("submit", formulario);
    });
    (form as any).reset();
  });

  state.mostrarMascotasCercaTuyo(root, contenedor, template);

  return div;
}
