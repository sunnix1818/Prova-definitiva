import { state } from "./core.js";

export function updateHUD() {
  const n = state.nations[state.playerNation];
  document.getElementById("nationName").textContent = n.name;
  document.getElementById("date").textContent =
    `${state.date.year}-${String(state.date.month).padStart(2,"0")}`;
  document.getElementById("pop").textContent =
    Math.floor(n.population).toLocaleString();
  document.getElementById("money").textContent = Math.floor(n.money);
  document.getElementById("troops").textContent = n.troops;
  document.getElementById("tech").textContent = n.tech.toFixed(2);
}
