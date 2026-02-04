import { state } from "./core.js";

function hashColor(name) {
  let h = 0;
  for (let c of name) h = c.charCodeAt(0) + ((h<<5)-h);
  return `hsl(${h%360},55%,45%)`;
}

export function getColor(name) {
  if (state.mapView === "normal") {
    return hashColor(name);
  }

  if (state.mapView === "diplomacy") {
    if (name === state.playerNation) return "#2563eb";
    return "#facc15";
  }
}
