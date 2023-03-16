import { Router } from "@vaadin/router";

const router = new Router(document.querySelector(".root"));
router.setRoutes([
  { path: "/", component: "page-ubication" },
  { path: "/ubication", component: "page-ubication" },
  { path: "/pets", component: "page-pets" },
  { path: "/signup", component: "page-signup" },
  { path: "/login", component: "page-login" },
  { path: "/mis-datos", component: "page-mis-datos" },
  { path: "/publicar-mascota", component: "page-publicar" },
  { path: "/mis-mascotas", component: "page-mis-mascotas" },
  { path: "/editar-mascota", component: "page-editar-mascota" },
]);
