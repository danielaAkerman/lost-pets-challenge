import { state } from "../../state";

export function initPageWelcome(root) {
  const div = document.createElement("div");

  div.innerHTML = `
  <h1 class="fs-1">Mascotas perdidas cerca tuyo</h1>

  <div class="results" id="results"></div>

  <template id="template">

    <div class="card" style="width: 18rem;">
      <img src="" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Bobby</h5>
        <p class="card-text">Córdoba</p>
        <button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal">¿Lo viste?</button>
      </div>
    </div>

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
              <input class="form-control" id="name" placeholder="Ingresá tu nombre">
            </div>

            <div class="mb-3">
              <label for="telefono" class="form-label">Tu teléfono:</label>
              <input class="form-control" id="telefono" placeholder="Ingresá tu teléfono">
            </div>

            <div class="mb-3">
              <label for="mensaje" class="form-label">¿Dónde lo viste?</label>
              <textarea class="form-control" id="mensaje" rows="3"></textarea>
            </div>

            <button type="submit" class="btn btn-primary mb-3">Enviar</button>

          </form>
          
        </div>
      </div>
    </div>
  </div>

</template>
  `;
  const contenedor = document.querySelector(".results");
  const template = document.querySelector("#template");

  state.mostrarMascotasCercaTuyo(root, contenedor, template);

  return div;
}
