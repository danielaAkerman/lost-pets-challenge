import { initRouter } from "./router";
import { state } from "./state";
import "./components/button"


(function () {



  const root = document.querySelector(".root") as HTMLElement;
  initRouter(root);
})();