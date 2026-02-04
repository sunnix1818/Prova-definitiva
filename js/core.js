import { createNation } from "./data.js";
import { initMap, drawMap, loadMap } from "./map.js";
import { updateHUD } from "./hud.js";

export const state = {
  date: { year: 1800, month: 1 },
  nations: {},
  playerNation: null,
  mapView: "normal"
};

const menu = document.getElementById("menu");
const endTurnBtn = document.getElementById("endTurn");
const mapViewSelect = document.getElementById("mapView");

/* ===== MENU ===== */
menu.innerHTML = `
  <h2>Seleziona mappa</h2>
  <button id="eu">🇪🇺 Europa</button>
  <button id="world">🌍 Mondo</button>
`;

document.getElementById("eu").onclick = () => start("europe");
document.getElementById("world").onclick = () => start("world");

function start(mode) {
  menu.innerHTML = "<h2>Caricamento…</h2>";

  loadMap(mode).then(regionNames => {
    regionNames.forEach(n => {
      state.nations[n] = createNation(n);
    });
    showNationSelect(regionNames);
  });
}

function showNationSelect(nations) {
  menu.innerHTML = "<h2>Scegli la tua nazione</h2>";
  nations.forEach(n => {
    const b = document.createElement("button");
    b.textContent = n;
    b.onclick = () => {
      state.playerNation = n;
      menu.style.display = "none";
      initMap();
      updateHUD();
      drawMap();
    };
    menu.appendChild(b);
  });
}

/* ===== TURNI ===== */
endTurnBtn.onclick = () => {
  const n = state.nations[state.playerNation];
  n.population *= 1.002;
  n.money += n.population * 0.01 * n.tech;
  n.tech += 0.01;

  state.date.month++;
  if (state.date.month > 12) {
    state.date.month = 1;
    state.date.year++;
  }

  updateHUD();
  drawMap();
};

mapViewSelect.onchange = e => {
  state.mapView = e.target.value;
  drawMap();
};
