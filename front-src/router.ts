// import { initPageUbication } from "./pages/0-ubication";
// import { initPageWelcome } from "./pages/1-welcome";
// import { initPageSignUp } from "./pages/2a-signup";
// import { initPageLogIn } from "./pages/2b-login";
// import { initPageMisDatos } from "./pages/2c-mis-datos";
// import { initPagePublicar } from "./pages/3a-publicar";
// import { initPageMisMascotas } from "./pages/3b-mis-mascotas";
// import { initPageEditarMascota } from "./pages/3c-editar-mascota";

// const routes = [
//   {
//     path: /\//,
//     handler: initPageUbication,
//   },
//   {
//     path: /\/ubication/,
//     handler: initPageUbication,
//   },
//   {
//     path: /\/welcome/,
//     handler: initPageWelcome,
//   },
//   {
//     path: /\/signup/,
//     handler: initPageSignUp,
//   },
//   {
//     path: /\/login/,
//     handler: initPageLogIn,
//   },
//   {
//     path: /\/mis-datos/,
//     handler: initPageMisDatos,
//   },
//   {
//     path: /\/publicar-mascota/,
//     handler: initPagePublicar,
//   },
//   {
//     path: /\/mis-mascotas/,
//     handler: initPageMisMascotas,
//   },
//   {
//     path: /\/editar-mascota/,
//     handler: initPageEditarMascota,
//   },
// ];

// export function initRouter(container: Element) {
//   function goTo(path) {
//     history.pushState({}, "", path);
//     handleRoute(path);
//   }

//   function handleRoute(route) {
//     for (const r of routes) {
//       if (r.path.test(route)) {
//         const el = r.handler({ goTo });

//         if (container.firstChild) {
//           container.firstChild.remove();
//         }
//         container.appendChild(el);
//       }
//     }
//   }

//   handleRoute(location.pathname);

//   window.onpopstate = function () {
//     handleRoute(location.pathname);
//   };
// }
