import { initRouter } from "./router";
import { state } from "./state";
import "./components/navbar"



(function () {

if (localStorage.token){
  state.init()
}

  const root = document.querySelector(".root") as HTMLElement;
  initRouter(root);
})();