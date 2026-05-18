(function () {
  const STORE_KEY = "sauerteig-love-state-v1";

  let lastDetailRecipeId = null;

  function readState() {
    try {
      return JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
    } catch {
      return {};
    }
  }

  function writeState(patch) {
    localStorage.setItem(STORE_KEY, JSON.stringify({ ...readState(), ...patch }));
  }

  function currentStatus() {
    const label = document.querySelector("#petStatusLabel")?.textContent || "";
    if (label.includes("Überfällig") || label.includes("Ueberfaellig")) return "overdue";
    if (label.includes("Hungrig")) return "hungry";
    if (label.includes("Schläft") || label.includes("Schlaeft")) return "sleeping";
    if (label.includes("Bereit")) return "ready";
    return "active";
  }

  function showToast(message) {
    const toast = document.querySelector("#toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(window.__sauerteigToastTimer);
    window.__sauerteigToastTimer = window.setTimeout(() => toast.classList.remove("show"), 2800);
  }

  function syncStarterHeader() {
    const state = readState();
    const name = state.starterName || document.querySelector("#starterName")?.value.trim() || "Blubber";
    const saved = Boolean(state.starterNameSaved);
    const title = document.querySelector("#starterNameTitle");
    const editor = document.querySelector("#starterEditor");
    if (title) title.textContent = name;
    if (editor) editor.classList.toggle("is-saved", saved);
  }

  function faceMarkup(status) {
    if (status === "sleeping") {
      return `
        <path class="jar-eye jar-eye-left sleeping" d="M63 94q9 8 18 0" />
        <path class="jar-eye jar-eye-right sleeping" d="M119 94q9 8 18 0" />
        <path class="jar-mouth sleeping" d="M91 115q10 7 20 0" />
      `;
    }

    if (status === "hungry") {
      return `
        <path class="jar-brow left" d="M59 78q12-9 25-4" />
        <path class="jar-brow right" d="M136 78q-12-9-25-4" />
        <circle class="jar-eye-open jar-eye-left" cx="72" cy="94" r="11" />
        <circle class="jar-eye-shine" cx="68" cy="90" r="3" />
        <circle class="jar-eye-open jar-eye-right" cx="128" cy="94" r="11" />
        <circle class="jar-eye-shine" cx="124" cy="90" r="3" />
        <path class="jar-mouth hungry" d="M91 119q9-8 18 0" />
      `;
    }

    if (status === "overdue") {
      return `
        <path class="jar-brow left worried" d="M57 78q13-13 27-5" />
        <path class="jar-brow right worried" d="M138 78q-13-13-27-5" />
        <circle class="jar-eye-open jar-eye-left" cx="72" cy="95" r="12" />
        <circle class="jar-eye-shine" cx="67" cy="91" r="3.4" />
        <circle class="jar-eye-open jar-eye-right" cx="128" cy="95" r="12" />
        <circle class="jar-eye-shine" cx="123" cy="91" r="3.4" />
        <path class="jar-mouth overdue" d="M94 121q6-7 12 0" />
      `;
    }

    return `
      <circle class="jar-eye-open jar-eye-left" cx="72" cy="94" r="12" />
      <circle class="jar-eye-shine" cx="68" cy="89" r="3.6" />
      <circle class="jar-eye-open jar-eye-right" cx="128" cy="94" r="12" />
      <circle class="jar-eye-shine" cx="124" cy="89" r="3.6" />
      <path class="jar-mouth happy" d="M88 113q12 15 24 0" />
      <path class="jar-mouth-tongue" d="M95 125q5 4 10 0" />
    `;
  }

  function statusExtras(status) {
    if (status === "sleeping") {
      return `
        <g class="pet-zzz">
          <text x="150" y="64">z</text>
          <text x="164" y="47">z</text>
          <text x="178" y="28">z</text>
        </g>
      `;
    }

    if (status === "ready") {
      return `
        <g class="pet-sparkles">
          <path d="M29 80l4 8 8 4-8 4-4 8-4-8-8-4 8-4z" />
          <path d="M171 76l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" />
          <path d="M162 145l3 6 6 3-6 3-3 6-3-6-6-3 6-3z" />
        </g>
      `;
    }

    if (status === "hungry") {
      return `
        <g class="pet-hungry-mark">
          <circle cx="159" cy="55" r="11" />
          <path d="M159 48v10" />
          <circle cx="159" cy="63" r="1.6" />
        </g>
      `;
    }

    if (status === "overdue") {
      return `
        <g class="pet-alert-marks">
          <path d="M30 72l-13-17" />
          <path d="M42 65l-6-20" />
          <path d="M170 72l13-17" />
          <path d="M158 65l6-20" />
          <path class="sweat" d="M48 96c8-13 17-9 13 3-2 7-8 12-14 9-5-2-3-7 1-12Z" />
        </g>
      `;
    }

    return "";
  }

  function renderCustomPet(force) {
    const stage = document.querySelector("#petStage");
    if (!stage) return;

    const state = readState();
    const name = state.starterName || document.querySelector("#starterName")?.value.trim() || "Sauerteig";
    const status = currentStatus();
    const existing = stage.querySelector(".single-pet");

    if (!force && existing?.dataset.status === status) return;

    stage.querySelector(".pet-character")?.remove();
    stage.querySelector(".custom-pet")?.remove();
    stage.querySelector(".single-pet")?.remove();

    stage.insertAdjacentHTML(
      "beforeend",
      `
        <div class="single-pet pet-state-${status}" data-status="${status}" aria-label="${name}, ein süßes Sauerteig-Pet im Glas">
          <svg class="single-pet-svg" viewBox="0 0 200 200" role="img" aria-hidden="true">
            <defs>
              <linearGradient id="jarGlass" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stop-color="#f7fffb" stop-opacity="0.88" />
                <stop offset="0.46" stop-color="#dff6f2" stop-opacity="0.25" />
                <stop offset="1" stop-color="#ffffff" stop-opacity="0.72" />
              </linearGradient>
              <linearGradient id="starterFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stop-color="#fff0bd" />
                <stop offset="0.54" stop-color="#f5c46e" />
                <stop offset="1" stop-color="#d88942" />
              </linearGradient>
              <linearGradient id="clothFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stop-color="#fff0c4" />
                <stop offset="1" stop-color="#dfae67" />
              </linearGradient>
              <linearGradient id="twineFill" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stop-color="#e9a13f" />
                <stop offset="1" stop-color="#9d5a25" />
              </linearGradient>
            </defs>

            <ellipse class="pet-ground-shadow" cx="100" cy="181" rx="52" ry="10" />

            <g class="pet-bob">
              ${statusExtras(status)}

              <g class="pet-arms">
                <path class="pet-arm left" d="M39 111c-16 2-25 13-23 27 2 13 13 21 25 17 10-3 15-12 16-24l-4-16c-4-4-8-5-14-4Z" />
                <path class="pet-arm right" d="M161 111c16 2 25 13 23 27-2 13-13 21-25 17-10-3-15-12-16-24l4-16c4-4 8-5 14-4Z" />
              </g>

              <g class="pet-legs">
                <path class="pet-leg left" d="M70 156c-9 7-14 14-13 22 1 7 7 10 17 9 10-1 18-5 18-12 0-8-8-14-15-21Z" />
                <path class="pet-leg right" d="M130 156c9 7 14 14 13 22-1 7-7 10-17 9-10-1-18-5-18-12 0-8 8-14 15-21Z" />
              </g>

              <g class="jar-body">
                <rect class="jar-outline" x="42" y="46" width="116" height="121" rx="31" />
                <path class="starter-shape" d="M46 92c13-7 23 4 37-2 15-7 26 5 42-1 12-5 22-2 29 3v43c0 19-15 33-34 33H80c-19 0-34-14-34-33Z" />
                <path class="starter-foam" d="M50 89c10-9 24 5 36-3 13-8 25 5 38-2 10-5 22-1 29 6" />

                <g class="pet-bubbles">
                  <circle cx="63" cy="104" r="4" />
                  <circle cx="77" cy="128" r="5" />
                  <circle cx="92" cy="102" r="3.5" />
                  <circle cx="111" cy="132" r="5.5" />
                  <circle cx="128" cy="105" r="4.2" />
                  <circle cx="139" cy="123" r="3.6" />
                  <circle cx="86" cy="145" r="3.2" />
                  <circle cx="117" cy="113" r="2.8" />
                </g>

                <path class="jar-glass" d="M52 58v82c0 14 11 25 25 25h46c14 0 25-11 25-25V58" />
                <path class="jar-shine left" d="M55 70c-6 27-5 55 2 79" />
                <path class="jar-shine right" d="M145 70c6 27 5 55-2 79" />

                <g class="pet-face">
                  <circle class="jar-cheek left" cx="56" cy="112" r="7" />
                  <circle class="jar-cheek right" cx="144" cy="112" r="7" />
                  ${faceMarkup(status)}
                </g>
              </g>

              <g class="pet-lid">
                <path class="cloth-top" d="M58 31h84c16 0 26 10 26 25 0 10-6 17-14 21-12 5-22-2-34 2-14 5-24-3-39 1-16 4-26-2-35-9-8-7-12-15-9-24 3-10 11-16 21-16Z" />
                <path class="cloth-skirt" d="M39 65c13 11 26 11 39 5 11 9 27 9 41 1 13 7 27 5 42-6 4 12-1 24-12 28-12 4-22-3-33 3-12 7-25 6-38-1-10 4-22 4-34-2-10-5-13-17-5-28Z" />
                <path class="twine-line" d="M41 65c35 11 83 11 118 0" />
                <path class="bow-loop left" d="M95 61c-18-14-32-8-31 4 2 13 18 12 31-4Z" />
                <path class="bow-loop right" d="M105 61c18-14 32-8 31 4-2 13-18 12-31-4Z" />
                <circle class="bow-knot" cx="100" cy="63" r="6" />
                <path class="bow-tail left" d="M96 68c-5 9-10 17-18 24" />
                <path class="bow-tail right" d="M104 68c5 9 10 17 18 24" />
              </g>
            </g>
          </svg>
        </div>
      `,
    );
  }

  function syncPetUi(force) {
    syncStarterHeader();
    renderCustomPet(force);
  }

  function decorateRecipeCards() {
    document.querySelectorAll(".recipe-card").forEach((card) => {
      const image = card.querySelector(".recipe-image");
      const favorite = card.querySelector('[data-action="favorite"]');
      const later = card.querySelector('[data-action="later"]');
      const details = card.querySelector('[data-action="detail"]');
      if (!image || !favorite || !later || !details) return;

      let actions = image.querySelector(".image-actions");
      if (!actions) {
        actions = document.createElement("div");
        actions.className = "image-actions";
        image.append(actions);
      }

      favorite.classList.remove("toggle-button");
      favorite.classList.add("image-action");
      favorite.textContent = "\u2665";
      later.classList.remove("toggle-button");
      later.classList.add("image-action");
      later.textContent = "\u25f7";

      if (!actions.contains(favorite)) actions.append(favorite);
      if (!actions.contains(later)) actions.append(later);

      if (!card.querySelector('[data-action="plan"]')) {
        const plan = document.createElement("button");
        plan.className = "card-button plan-card-button";
        plan.dataset.action = "plan";
        plan.dataset.id = details.dataset.id;
        plan.textContent = "Planen";
        details.after(plan);
      }
    });
  }

  function decorateRecipeDetail() {
    const detail = document.querySelector("#recipeDetail .recipe-detail");
    if (!detail || !lastDetailRecipeId || detail.querySelector(".detail-plan-button")) return;
    const button = document.createElement("button");
    button.className = "primary-button detail-plan-button";
    button.dataset.detailPlan = lastDetailRecipeId;
    button.textContent = "Mit diesem Rezept planen";
    const credit = detail.querySelector("small")?.closest("p");
    detail.insertBefore(button, credit || null);
  }

  function goToPlanner(recipeId) {
    const select = document.querySelector("#plannerRecipe");
    const option = select?.querySelector(`option[value="${recipeId}"]`);
    if (!select || !option) return;
    const dialog = document.querySelector("#recipeDialog");
    if (dialog?.open && dialog.close) dialog.close();
    select.value = recipeId;
    document.querySelector('[data-section="planer"]')?.click();
    document.querySelector("#plannerDate")?.focus();
    showToast(`${option.textContent.trim()} ist im Planer ausgewählt.`);
  }

  function bindStarterEvents() {
    document.querySelector("#saveName")?.addEventListener("click", () => {
      const name = document.querySelector("#starterName")?.value.trim() || "Blubber";
      writeState({ starterName: name, starterNameSaved: true });
      syncPetUi(true);
    });

    document.querySelector("#editName")?.addEventListener("click", () => {
      writeState({ starterNameSaved: false });
      syncStarterHeader();
      document.querySelector("#starterName")?.focus();
    });
  }

  function bindPlannerEvents() {
    document.querySelector("#recipeGrid")?.addEventListener("click", (event) => {
      const action = event.target.closest("[data-action]");
      if (!action) return;
      if (action.dataset.action === "detail") lastDetailRecipeId = action.dataset.id;
      if (action.dataset.action === "plan") {
        event.preventDefault();
        goToPlanner(action.dataset.id);
      }
    });

    document.querySelector("#recipeDetail")?.addEventListener("click", (event) => {
      const button = event.target.closest("[data-detail-plan]");
      if (!button) return;
      event.preventDefault();
      goToPlanner(button.dataset.detailPlan);
    });
  }

  function bindObservers() {
    const petStage = document.querySelector("#petStage");
    if (petStage) {
      new MutationObserver(() => {
        if (!petStage.querySelector(".single-pet")) {
          renderCustomPet(true);
        }
      }).observe(petStage, { childList: true });
    }

    const recipeGrid = document.querySelector("#recipeGrid");
    if (recipeGrid) {
      new MutationObserver(decorateRecipeCards).observe(recipeGrid, { childList: true, subtree: true });
    }

    const recipeDetail = document.querySelector("#recipeDetail");
    if (recipeDetail) {
      new MutationObserver(decorateRecipeDetail).observe(recipeDetail, { childList: true, subtree: true });
    }

    const statusLabel = document.querySelector("#petStatusLabel");
    if (statusLabel) {
      new MutationObserver(() => renderCustomPet(true)).observe(statusLabel, { childList: true, subtree: true });
    }
  }

  function migrateState() {
    const state = readState();
    if ("petId" in state) {
      const { petId, ...rest } = state;
      localStorage.setItem(STORE_KEY, JSON.stringify(rest));
    }
  }

  function init() {
    migrateState();
    syncPetUi(true);
    decorateRecipeCards();
    decorateRecipeDetail();
    bindStarterEvents();
    bindPlannerEvents();
    bindObservers();
  }

  init();
})();
