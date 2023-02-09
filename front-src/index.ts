import { initRouter } from "./router";
import { state } from "./state";
import "./components/navbar"
import "./components/button"
import "./components/input"
import "./components/textarea"
import "./components/text"
import "./components/card"


(function () {
  const root = document.querySelector(".root") as HTMLElement;
  initRouter(root);
})();