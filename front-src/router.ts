import { initPageHome } from "./pages/1-home";
import { initPageReport } from "./pages/2-reportar";
import { initPageIngresar } from "./pages/3-ingresar";
import { initPagePassword } from "./pages/4-password";
import { initPageDatos } from "./pages/5-mis-datos";
import { initPageEditar } from "./pages/6-editar";
import { initPageMascotas } from "./pages/7-mis-mascotas";


const routes = [
  {
    path: /\//,
    handler: initPageHome,
  },
  {
    path: /\/reportar/,
    handler: initPageReport,
  },
  {
    path: /\/ingresar/,
    handler: initPageIngresar,
  },
  {
    path: /\/password/,
    handler: initPagePassword,
  },
  {
    path: /\/mis-datos/,
    handler: initPageDatos,
  },
  {
    path: /\/editar/,
    handler: initPageEditar,
  },
  {
    path: /\/mis-mascotas/,
    handler: initPageMascotas,
  }
];

export function initRouter(container: Element) {
  function goTo(path) {
    history.pushState({}, "", path);
    handleRoute(path);
  }

  function handleRoute(route) {
    for (const r of routes) {
      if (r.path.test(route)) {
        const el = r.handler({ goTo });

        if (container.firstChild) {
          container.firstChild.remove();
        }
        container.appendChild(el);
      }
    }
  }

  handleRoute(location.pathname);

  window.onpopstate = function () {
    handleRoute(location.pathname);
  };
}
