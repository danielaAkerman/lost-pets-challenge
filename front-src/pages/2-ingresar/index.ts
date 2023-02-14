import { state } from "../../state";

export function initPageIngresar(root) {
  const div = document.createElement("div");
  div.innerHTML = `
  <text-comp size="fs-1" weight="fw-bold">Ingresar</text-comp>
  <br>
  <form class="form">
    <input type="email" class="form-control mb-3" placeholder="Ingresá tu email" name="usermail" />
    <br>
    <button class="btn btn-primary">SIGUIENTE</button>
  </form>
  `;

  const form = div.querySelector(".form");
  form!.addEventListener("submit", (e) => {
    e.preventDefault();
    const target = e.target as any;

    const data = new FormData(target);
    const value = Object.fromEntries(data.entries());

    const userEmail = value.usermail;
    state.setEmail(userEmail, root)
  });

  return div;
}
