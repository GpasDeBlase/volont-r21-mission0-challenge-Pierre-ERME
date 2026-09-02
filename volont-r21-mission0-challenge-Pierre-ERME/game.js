// Prototype de démonstration — poste Chef de groupe.
// Base volontairement simple : à vous d'améliorer le feedback donné au joueur.

const SCENARIOS = [
  { id: "intrusion", title: "INTRUSION" },
  { id: "incendie", title: "INCENDIE" },
  { id: "secourisme", title: "SECOURISME" },
  { id: "inondation", title: "INONDATION" },
];

const STATUS_LABEL = {
  "a-traiter": "À TRAITER",
  erreur: "ERREUR",
  valide: "VALIDÉ",
};

const state = {};
SCENARIOS.forEach((s) => {
  state[s.id] = "a-traiter";
});

const board = document.getElementById("board");
const teamState = document.getElementById("teamState");
const rearticulateBtn = document.getElementById("rearticulateBtn");
const progressBar = document.getElementById("progressBar");
const progressCount = document.getElementById("progressCount");

function render() {
  board.innerHTML = "";

  SCENARIOS.forEach((scenario) => {
    const cardState = state[scenario.id];

    const card = document.createElement("article");
    card.className = "card";

    const title = document.createElement("p");
    title.className = "card__title";
    title.textContent = scenario.title;

    const status = document.createElement("span");
    status.className = "card__status";
    status.dataset.state = cardState;
    status.textContent = STATUS_LABEL[cardState];

    const button = document.createElement("button");
    button.className = "card__btn";
    button.textContent = "Lecture RFID";
    button.disabled = cardState === "valide";
    button.addEventListener("click", () => simulateRfidRead(scenario.id));

    card.append(title, status, button);
    board.append(card);
  });

  const allValidated = SCENARIOS.every((s) => state[s.id] === "valide");
  teamState.hidden = !allValidated;

  const validatedCount = SCENARIOS.filter((s) => state[s.id] === "valide").length;
  const percent = Math.round((validatedCount / SCENARIOS.length) * 100);
  progressBar.style.width = `${percent}%`;
  progressBar.dataset.complete = String(allValidated);
  progressCount.textContent = `${validatedCount} / ${SCENARIOS.length}`;
}

function simulateRfidRead(scenarioId) {
  // Simulation basique : une lecture sur deux est considérée correcte.
  // Remplacez cette logique par votre propre amélioration si besoin.
  const success = Math.random() > 0.5;
  state[scenarioId] = success ? "valide" : "erreur";
  render();
}

rearticulateBtn.addEventListener("click", () => {
  // Point de départ volontairement minimal : améliorez ce feedback.
  alert("Réarticulation du groupe déclenchée.");
});

render();
