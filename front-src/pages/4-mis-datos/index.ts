import { state } from "../../state";

export function initPageDatos(root) {
  const div = document.createElement("div");
  div.innerHTML = `
  <text-comp size="fs-1" weight="fw-bold">Mis datos</text-comp>
  <br>
  <br>
  <form class="form">
    <input class="form-control mb-3" placeholder="Ingresá tu nombre" name="fullname" >
    <br>
    <br>
    <input type="password" class="form-control mb-3" placeholder="Ingresá tu password" name="password" >
    <br>
    <input type="password" class="form-control mb-3" placeholder="Repetí tu password" name="password2" >
    <br>
    <button class="btn btn-primary">SIGUIENTE</button>
  </form>
  <div class="alerta"></div>
  `;

  const form = div.querySelector(".form") as HTMLElement;
  const alerta = div.querySelector(".alerta") as HTMLElement;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("form enviado")
    const target = e.target as any;

    const data = new FormData(target);
    const value = Object.fromEntries(data.entries());

    const fullname = value.fullname;
    const password = value.password;
    const password2 = value.password2;
    if (password == password2) {
      state.getAuth(value, root);
    } else if (password != password2) {
      alerta.innerHTML=`<p>Las constraseñas no coinciden</p>`
    }
  });

  return div;
}
