import { state } from "../../state";

export function initPageMisDatos(root) {
  const div = document.createElement("div");

  div.innerHTML = `
  <h1 class="fs-1">Mis Datos</h1>

  <form class="form-mis-datos">

  <div class="mb-3">
    <label for="Name" class="form-label">Nombre</label>
    <input class="form-control" id="Name" aria-describedby="nameHelp">
  </div>

  <div class="mb-3">
    <label for="Email" class="form-label">Email</label>
    <input type="email" class="form-control" id="Email" aria-describedby="emailHelp">
  </div>

  <div class="mb-3">
    <label for="Contraseña" class="form-label">Contraseña</label>
    <input type="password" class="form-control" id="Contraseña">
  </div>

  <div class="mb-3">
    <label for="Repetir-Contraseña" class="form-label">Repetir contraseña</label>
    <input type="password" class="form-control" id="Repetir-Contraseña">
  </div>

  <div class="alerta-password"></div>

  <button type="submit" class="btn btn-primary">Actualizar mis datos</button>
  
  </form>
  `;

  const alertaPassword = div.querySelector(".alerta-password")! as any;
  const currentState = state.getState();

  const fullname = currentState.fullname;

  const nameInput = div.querySelector("#Name")! as any;
  const emailInput = div.querySelector("#Email")! as any;
  const passwordInput = div.querySelector("#Contraseña")! as any;
  const repeatPasswordInput = div.querySelector("#Repetir-Contraseña")! as any;

  nameInput.value = currentState.fullname;
  emailInput.value = currentState.email;

  const form = div.querySelector(".form-mis-datos")! as any;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (passwordInput.value == repeatPasswordInput.value) {
      alertaPassword.innerHTML = "";

      const dataValues: any = {};

      dataValues.fullname = nameInput.value;
      dataValues.email = emailInput.value;
      dataValues.password = passwordInput.value;

      state.updateUser(dataValues);
    } else if (passwordInput.value != repeatPasswordInput.value) {
      alertaPassword.innerHTML = `Las constraseñas no coinciden`;
    }
  });

  return div;
}
