import { state } from "../../state";

export function initPageWelcome(root) {
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

  myModal.addEventListener("shown.bs.modal", (e) => {
    console.log("escuchando el modal");
    const event = e as any;
    const button = event.relatedTarget;
    const petName = button.getAttribute("data-bs-pet_name");
    const petId = button.getAttribute("data-bs-pet_id");

    const modalTitle = myModal.querySelector(".modal-title")!;
    const inputReporterName = myModal.querySelector(".name");
    const inputReporterTelefono = myModal.querySelector(".telefono");
    const inputReporterMensaje = myModal.querySelector(".mensaje");

    modalTitle.textContent = `Ayudanos a encontrar a ${petName}`;
  });

  // const exampleModal = document.getElementById("exampleModal");
  // exampleModal.addEventListener("show.bs.modal", (event) => {
  //   const button = event.relatedTarget;
  //   const recipient = button.getAttribute("data-bs-whatever");
  //   const modalTitle = exampleModal.querySelector(".modal-title");
  //   const modalBodyInput = exampleModal.querySelector(".modal-body input");
  //   modalTitle.textContent = `New message to ${recipient}`;
  //   modalBodyInput.value = recipient;
  // });

  state.mostrarMascotasCercaTuyo(root, contenedor, template);

  let counterB = 2;
  const intervalId = setInterval(() => {
    counterB--;
    if (counterB < 0) {
      clearInterval(intervalId);

      const form = div.querySelector(".form");
      form!.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log(form);

        const target = e.target as any;
        const data = new FormData(target);
        const value = Object.fromEntries(data.entries());

        console.log("objeto VALUE", value);

        const visto: any = {};

        // visto.reporter = div.querySelector(".name")!.value
        // visto.phone_number = div.querySelector(".telefono").value
        // visto.message = div.querySelector(".mensaje").value

        const pet_id = div
          .querySelector(".selected_pet")
          ?.getAttribute("pet_id");

        visto.pet_id = pet_id;

        console.log("objeto VISTO", visto);
        // state.setReporte(visto);
      });
    }
  }, 1000);

  return div;
}
