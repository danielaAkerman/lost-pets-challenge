import { state } from "../../state";

export function initPageLogIn(root) {
  const div = document.createElement("div");

  div.innerHTML = `
  <h1 class="fs-1">Log in</h1>

  <form class="form-login">

  <div class="mb-3">
    <label for="Email" class="form-label">Email</label>
    <input type="email" class="form-control" id="Email" aria-describedby="emailHelp">
  </div>

  <div class="mb-3">
    <label for="Password" class="form-label">Contraseña</label>
    <input type="password" class="form-control" id="Password">
  </div>

  <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="Check" checked>
    <label class="form-check-label" for="Check">Mantener sesión iniciada</label>
  </div>

  <button type="submit" class="btn btn-primary">Ingresar</button>
  
  <div class="alerta"></div>

  </form>
  
  <hr>
  
  <div class="login-signup-container">
    <label class="login-signup">¿Aún no tenés cuenta?</label>
    <button class="btn btn-success crear-cuenta">Crear cuenta</button>
  </div>
  `;

  const buttonNewAccount = div.querySelector(".crear-cuenta");
  buttonNewAccount?.addEventListener("click", (e) => {
    root.goTo("./signup");
  });

  const emailInput = div.querySelector("#Email")! as any;
  const passwordInput = div.querySelector("#Password")! as any;
  const checkInput = div.querySelector("#Check")! as any;

  const alerta = div.querySelector(".alerta")! as any

  const form = div.querySelector(".form-login");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const loginValues: any = {};

    loginValues.email = emailInput.value;
    loginValues.password = passwordInput.value;
    loginValues.check = checkInput.checked

    state.logIn(loginValues, root, alerta)
    // state.getToken(loginValues, root, alerta);

  });

  return div;
}
