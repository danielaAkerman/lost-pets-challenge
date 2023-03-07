import { mapboxgl, MapboxClient } from "mapbox-gl";

const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;
const mapboxClient = new MapboxClient(MAPBOX_TOKEN);

export {  mapboxgl, MapboxClient };
