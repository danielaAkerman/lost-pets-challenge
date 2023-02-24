import { initPageUbication } from "./pages/0-ubication";
import { initPageWelcome } from "./pages/1-welcome";
import { initPageSignUp } from "./pages/2a-signup";

const routes = [
  {
    path: /\//,
    handler: initPageUbication,
  },
  {
    path: /\/ubication/,
    handler: initPageUbication,
  },
  {
    path: /\/welcome/,
    handler: initPageWelcome,
  },
  {
    path: /\/signup/,
    handler: initPageSignUp,
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
