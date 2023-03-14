// import { Router } from "@vaadin/router";
import { state } from "../../state";

customElements.define(
  "page-signup",
  class extends HTMLElement {
    connectedCallback() {
      this.render();
    }

    render() {
      this.innerHTML = `
      <h1 class="fs-1">Crear cuenta</h1>

      <form class="form-signup">
    
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
    
      <button type="submit" class="btn btn-primary">Ingresar</button>
      
      </form>
    
      <div class="confirmacion"></div>
    `;

      const alertaPassword = this.querySelector(".alerta-password")! as any;
      const confirmacion = this.querySelector(".confirmacion")! as any;

      const nameInput = this.querySelector("#Name")! as any;
      const emailInput = this.querySelector("#Email")! as any;
      const passwordInput = this.querySelector("#Contraseña")! as any;
      const repeatPasswordInput = this.querySelector(
        "#Repetir-Contraseña"
      )! as any;

      const form = this.querySelector(".form-signup")! as any;

      form.addEventListener("submit", (e) => {
        e.preventDefault();

        if (passwordInput.value == repeatPasswordInput.value) {
          alertaPassword.innerHTML = "";

          const signUpValues: any = {};

          signUpValues.fullname = nameInput.value;
          signUpValues.email = emailInput.value;
          signUpValues.password = passwordInput.value;

          state.getAuth(signUpValues, confirmacion);
        } else if (passwordInput.value != repeatPasswordInput.value) {
          alertaPassword.innerHTML = `Las constraseñas no coinciden`;
        }
      });
    }
  }
);
