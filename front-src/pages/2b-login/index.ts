import { Router } from "@vaadin/router";
import { state } from "../../state";

customElements.define(
  "page-login",
  class extends HTMLElement {
    connectedCallback() {
      this.render();
    }

    render() {
      this.innerHTML = `
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

      const buttonNewAccount = this.querySelector(".crear-cuenta")! as any;
      buttonNewAccount.addEventListener("click", (e) => {
        Router.go("signup");
      });

      const emailInput = this.querySelector("#Email")! as any;
      const passwordInput = this.querySelector("#Password")! as any;
      const checkInput = this.querySelector("#Check")! as any;

      const alerta = this.querySelector(".alerta")! as any;

      const form = this.querySelector(".form-login");
      form?.addEventListener("submit", (e) => {
        e.preventDefault();
        const loginValues: any = {};

        loginValues.email = emailInput.value;
        loginValues.password = passwordInput.value;
        loginValues.check = checkInput.checked;

        state.logIn(loginValues, alerta);
      });
    }
  }
);
