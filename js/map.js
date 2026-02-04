import { state } from "./core.js";
import { getColor } from "./views.js";

const canvas = document.getElementById("map");
const ctx = canvas.getContext("2d");

let regions = [];
let projection, path, transform = d3.zoomIdentity;

function resize() {
  canvas.width = innerWidth - 320;
  canvas.height = innerHeight;
}
resize();
addEventListener("resize", resize);

export function loadMap(mode) {
  const url = mode === "europe"
    ? "https://raw.githubusercontent.com/leakyMirror/map-of-europe/master/GeoJSON/europe.geojson"
    : "https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson";

  projection = d3.geoMercator()
    .center(mode === "europe" ? [15,55] : [0,20])
    .scale(mode === "europe" ? 650 : 280)
    .translate([canvas.width/2, canvas.height/2]);

  path = d3.geoPath(projection, ctx);

  return fetch(url)
    .then(r => r.json())
    .then(data => {
      regions = data.features.map(r => {
        r._name = r.properties.NAME || r.properties.ADMIN || r.properties.name;
        return r;
      });
      return [...new Set(regions.map(r => r._name))];
    });
}

export function initMap() {
  d3.select(canvas).call(
    d3.zoom().scaleExtent([1,10]).on("zoom", e => {
      transform = e.transform;
      drawMap();
    })
  );
}

export function drawMap() {
  ctx.setTransform(1,0,0,1,0,0);
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "#1e40af";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  ctx.setTransform(transform.k,0,0,transform.k,transform.x,transform.y);

  regions.forEach(r => {
    ctx.beginPath();
    path(r);
    ctx.fillStyle = getColor(r._name);
    ctx.fill();
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 0.4;
    ctx.stroke();
  });
}
