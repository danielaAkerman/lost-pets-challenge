import { Dropzone } from "dropzone";
import { geocodeForward } from "mapbox-gl";
import * as mapboxgl from "mapbox-gl";
import { mapboxClient } from "../../lib/mapbox";

const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;

import { state } from "../../state";
import { Router } from "@vaadin/router";

customElements.define(
  "page-editar-mascota",
  class extends HTMLElement {
    connectedCallback() {
      state.irAEditarMascota(this);
      this.render();
    }
    render() {
      const currentState = state.getState();

      this.innerHTML = `
      <link
      href="//api.mapbox.com/mapbox-gl-js/v2.3.1/mapbox-gl.css"
      rel="stylesheet"
    />
      <h1 class="fs-1">Editar Mascota</h1>
    
      <form class="form-publicar">
    
      <div class="mb-3">
        <label for="Name" class="form-label">Nombre de tu mascota</label>
        <input class="form-control" id="Name" aria-describedby="nameHelp">
      </div>
    
      <div class="mb-3 dropzone">
        <img class="pet-picture" src="" alt="" style="width:100%">
        <button type="button" class="btn btn-link actualizar-picture">Eliminar esta imagen</button>
      </div>
    
      <div class="mb-3 mapa-container"></div>
    
      <div class="mb-3">
        <label for="Ubicacion" class="form-label">Ciudad o barrio</label>
        <input class="form-control" id="Ubicacion">
        <p class="text-danger alerta"></p>
      </div>
    
      <button type="submit" class="btn btn-primary">Publicar</button>

      </form>
    `;

      // Dropzone
      const divDrop = this.querySelector(".dropzone")!;

      const eliminarImg = this.querySelector(".actualizar-picture")!;
      const img = this.querySelector(".pet-picture")!;

      eliminarImg.addEventListener("click", () => {
        img.remove();
        eliminarImg.remove();
      });
      let imageDataURL;
      const myDropzone = new Dropzone(divDrop, {
        url: "/falsa",
        clickable: true,
        autoProcessQueue: false,
        addRemoveLinks: true,
      });

      myDropzone.on("thumbnail", function (file) {
        // usando este evento pueden acceder al dataURL directamente
        imageDataURL = file.dataURL;
      });

      // Mapbox
      // INICIA EL MAPA EN EL CONTENEDOR

      const mapContainer = this.querySelector(".mapa-container");
      function initMap() {
        mapboxgl.accessToken = MAPBOX_TOKEN;
        return new mapboxgl.Map({
          container: mapContainer,
          style: "mapbox://styles/mapbox/streets-v11",
          center: [-74.5, 40], // starting position [lng, lat]
          zoom: 9, // starting zoom
        });
      }
      const map: any = initMap();

      const petName = this.querySelector("#Name")! as any;

      const form = this.querySelector(".form-publicar")!;
      form.addEventListener("submit", (e) => {
        e.preventDefault();

        const pet_id = petName.getAttribute("pet_id");

        const inputLocalizacion = this.querySelector("#Ubicacion")! as any;
        const localValue = inputLocalizacion.value;
        if (localValue) {
          // SE REALIZA LA GEOBUSQUEDA
          mapboxClient.geocodeForward(
            localValue,
            {
              country: "ar",
              autocomplete: true,
              language: "es",
            },

            // SE GUARDA LOS DATOS DE LA BUSQUIEDA EN UN ATRIBUTO SEARCHDATA
            (err, data, res) => {
              const firstResult = data.features[0];
              const lng = firstResult.geometry.coordinates[0];
              const lat = firstResult.geometry.coordinates[1];
              const searchData = { lng, lat };
              console.log(searchData);

              // CREA EL MARKER EN EL MAPA

              new mapboxgl.Marker()
                .setLngLat(firstResult.geometry.coordinates)
                .addTo(map);

              map.setCenter(firstResult.geometry.coordinates);
              map.setZoom(14);

              // Objeto para request
              const datosNewPet: any = {};

              datosNewPet.name = petName.value || "";
              datosNewPet.id = pet_id;
              datosNewPet.imagen_data = imageDataURL || "";
              datosNewPet.ubication = localValue;

              datosNewPet.last_location_lat = lat || "";
              datosNewPet.last_location_lng = lng || "";

              console.log({ datosNewPet });

              state.editarMascota(datosNewPet);
            }
          );
        } else if (!localValue) {
          console.log("poner ubicacion");
          this.querySelector(
            ".alerta"
          )!.innerHTML = `Insertar ubicación para continuar`;
        }
      });

    }
  }
);
