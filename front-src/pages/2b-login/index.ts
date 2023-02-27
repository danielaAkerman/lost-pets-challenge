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
    <input type="checkbox" class="form-check-input" id="Check">
    <label class="form-check-label" for="Check">Mantener sesión iniciada</label>
  </div>

  <button type="submit" class="btn btn-primary">Ingresar</button>
  
  </form>
  
  <hr>
  
  <div class="login-signup-container">
    <label class="login-signup">¿Aún no tenés cuenta?</label>
    <button class="btn btn-success">Crear cuenta</button>
  </div>
  `;

  return div;
}
