import { state } from "../../state";

export function initPageWelcome(root) {
  const div = document.createElement("div");

  div.innerHTML = `
  <h1 class="fs-1">Mascotas perdidas cerca tuyo</h1>

  <div class="results" id="results"></div>

  <template id="template">

    <div class="card" style="width: 18rem;">
      <img src="
      https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" 
      class="card-img-top" alt="...">
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
          <h1 class="modal-title fs-5" id="exampleModalLabel">Informanos sobre Bobby</h1>
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

state.mostrarMascotasCercaTuyo(root, contenedor, template)

  contenedor!.replaceChildren();

  for (const r of results) {
    const linkEl = template.content.querySelector(".result-link");
    linkEl.href = r.permalink;
    linkEl.style.textDecoration = "none";

    const titleEl = template.content.querySelector(".result-item-title");
    titleEl.textContent = r.title;

    const priceEl = template.content.querySelector(".result-item-price");
    priceEl.textContent = "$" + r.price;

    const imgEl = template.content.querySelector(".result-item-img");
    imgEl.src = r.thumbnail;

    const conditionEl = template.content.querySelector(
      ".result-item-condition"
    );
    conditionEl.textContent = r.condition;

    const sellEl = template.content.querySelector(
      ".result-item-sell-count-num"
    );
    sellEl.textContent = r.sold_quantity;

    const clone = document.importNode(template.content, true);

    contenedor.appendChild(clone);
  }

  button.addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition((e) => {
      const ubication = {
        lat: e.coords.latitude as any,
        lng: e.coords.longitude as any,
      };
      state.setUbication(ubication);
      // localStorage.setItem("lng", lng);
      // localStorage.setItem("lat", lat);
    });

    div.innerHTML = htmlMascotas;
  });

  return div;
}
