import { state } from "./state";
import "./routes";
import "./components/navbar";
import "./pages/0-ubication";
import "./pages/1-welcome";
import "./pages/2a-signup";
import "./pages/2b-login";
import "./pages/2c-mis-datos";
import "./pages/3a-publicar";
import "./pages/3b-mis-mascotas";
import "./pages/3c-editar-mascota";

(function () {
  state.init();
})();
