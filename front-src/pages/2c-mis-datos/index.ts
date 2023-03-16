import { Router } from "@vaadin/router";
import { state } from "../../state";

customElements.define(
  "page-mis-datos",
  class extends HTMLElement {
    connectedCallback() {
      this.render();
    }

    render() {
      const currentState = state.getState();
      if (currentState.userId) {
        console.log("hay user");
      } else if (!currentState.userId) {
        console.log("NO hay user");
        currentState.nextRoute= "mis-datos"
        state.setState(currentState)
        Router.go("login")
      }

      this.innerHTML = `
      <h1 class="fs-1">Mis Datos</h1>

      <div class="modal-login"></div>
    
      <label class="mb-3">Completa sólo los campos que desees actualizar</label>
    
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

      const modalLogin = this.querySelector(".modal-login")!;

      const alertaPassword = this.querySelector(".alerta-password")! as any;
      // const currentState = state.getState();

      const fullname = currentState.fullname;

      const nameInput = this.querySelector("#Name")! as any;
      const emailInput = this.querySelector("#Email")! as any;
      const passwordInput = this.querySelector("#Contraseña")! as any;
      const repeatPasswordInput = this.querySelector(
        "#Repetir-Contraseña"
      )! as any;

      nameInput.value = currentState.fullname;
      emailInput.value = currentState.email;

      const form = this.querySelector(".form-mis-datos")! as any;

      form.addEventListener("submit", (e) => {
        e.preventDefault();

        if (passwordInput.value == repeatPasswordInput.value) {
          alertaPassword.innerHTML = "";

          const dataValues: any = {};

          dataValues.fullname = nameInput.value || currentState.fullname;
          dataValues.email = emailInput.value || currentState.email;
          dataValues.password = passwordInput.value;

          state.updateUser(dataValues);
        } else if (passwordInput.value != repeatPasswordInput.value) {
          alertaPassword.innerHTML = `Las constraseñas no coinciden`;
        }
      });
    }
  }
);
