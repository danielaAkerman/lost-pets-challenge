import { initPageWelcome } from "./pages/1";
import { otraPage } from "./pages/2";


const routes = [
  {
    path: /\//,
    handler: initPageWelcome,
  },
  {
    path: /\/2/,
    handler: otraPage,
  },
  
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
