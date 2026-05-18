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
        <path class="jar-eye jar-eye-left sleeping" d="M82 109q8 7 16 0" />
        <path class="jar-eye jar-eye-right sleeping" d="M102 109q8 7 16 0" />
        <path class="jar-mouth sleeping" d="M93 126q7 5 14 0" />
      `;
    }

    if (status === "hungry") {
      return `
        <path class="jar-brow left" d="M77 92q10-7 20-3" />
        <path class="jar-brow right" d="M123 92q-10-7-20-3" />
        <circle class="jar-eye-open jar-eye-left" cx="90" cy="109" r="9.5" />
        <circle class="jar-eye-shine" cx="86.5" cy="105.5" r="2.8" />
        <circle class="jar-eye-open jar-eye-right" cx="110" cy="109" r="9.5" />
        <circle class="jar-eye-shine" cx="106.5" cy="105.5" r="2.8" />
        <path class="jar-mouth hungry" d="M93 128q7-6 14 0" />
      `;
    }

    if (status === "overdue") {
      return `
        <path class="jar-brow left worried" d="M76 92q11-10 21-4" />
        <path class="jar-brow right worried" d="M124 92q-11-10-21-4" />
        <circle class="jar-eye-open jar-eye-left" cx="90" cy="109" r="10" />
        <circle class="jar-eye-shine" cx="86" cy="105" r="3" />
        <circle class="jar-eye-open jar-eye-right" cx="110" cy="109" r="10" />
        <circle class="jar-eye-shine" cx="106" cy="105" r="3" />
        <path class="jar-mouth overdue" d="M96 129q4-6 8 0" />
      `;
    }

    return `
      <circle class="jar-eye-open jar-eye-left" cx="90" cy="108" r="10" />
      <circle class="jar-eye-shine" cx="86" cy="104" r="3.2" />
      <circle class="jar-eye-open jar-eye-right" cx="110" cy="108" r="10" />
      <circle class="jar-eye-shine" cx="106" cy="104" r="3.2" />
      <path class="jar-mouth happy" d="M90 126q10 12 20 0" />
      <path class="jar-mouth-tongue" d="M96 136q4 3 8 0" />
    `;
  }

  function statusExtras(status) {
    if (status === "sleeping") {
      return `
        <g class="pet-zzz">
          <text x="145" y="66">z</text>
          <text x="158" y="49">z</text>
          <text x="171" y="32">z</text>
        </g>
      `;
    }

    if (status === "ready") {
      return `
        <g class="pet-sparkles">
          <path d="M35 88l4 8 8 4-8 4-4 8-4-8-8-4 8-4z" />
          <path d="M165 83l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" />
          <path d="M154 148l3 6 6 3-6 3-3 6-3-6-6-3 6-3z" />
        </g>
      `;
    }

    if (status === "hungry") {
      return `
        <g class="pet-hungry-mark">
          <circle cx="152" cy="61" r="10" />
          <path d="M152 55v8" />
          <circle cx="152" cy="68" r="1.6" />
        </g>
      `;
    }

    if (status === "overdue") {
      return `
        <g class="pet-alert-marks">
          <path d="M36 77l-12-15" />
          <path d="M48 71l-5-18" />
          <path d="M164 77l12-15" />
          <path d="M152 71l5-18" />
          <path class="sweat" d="M55 102c7-11 15-8 11 3-2 6-7 10-12 8-4-2-2-6 1-11Z" />
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

            <ellipse class="pet-ground-shadow" cx="100" cy="181" rx="56" ry="11" />

            <g class="pet-bob">
              ${statusExtras(status)}

              <g class="pet-arms">
                <path class="pet-arm left" d="M48 116c-10 3-16 11-15 20 1 9 8 14 16 12 7-2 11-8 12-16l-3-11c-3-4-6-6-10-5Z" />
                <path class="pet-arm right" d="M152 116c10 3 16 11 15 20-1 9-8 14-16 12-7-2-11-8-12-16l3-11c3-4 6-6 10-5Z" />
              </g>

              <g class="pet-legs">
                <path class="pet-leg left" d="M76 159c-8 7-12 13-11 20 1 6 6 9 14 8 9-1 15-5 15-11 0-7-7-12-13-18Z" />
                <path class="pet-leg right" d="M124 159c8 7 12 13 11 20-1 6-6 9-14 8-9-1-15-5-15-11 0-7 7-12 13-18Z" />
              </g>

              <g class="jar-body">
                <rect class="jar-outline" x="34" y="49" width="132" height="118" rx="34" />
                <path class="starter-shape" d="M39 96c14-6 25 5 39 0 15-5 27 6 42 1 13-4 25-1 37 4v35c0 19-15 33-34 33H77c-21 0-38-15-38-35Z" />
                <path class="starter-foam" d="M44 94c11-9 25 4 37-2 14-7 26 4 39-2 11-5 24-1 32 7" />

                <g class="pet-bubbles">
                  <circle cx="70" cy="109" r="4.2" />
                  <circle cx="81" cy="136" r="5.1" />
                  <circle cx="93" cy="103" r="3.4" />
                  <circle cx="116" cy="136" r="5.2" />
                  <circle cx="129" cy="108" r="4.1" />
                  <circle cx="139" cy="125" r="3.6" />
                  <circle cx="90" cy="148" r="3.2" />
                  <circle cx="111" cy="116" r="2.7" />
                </g>

                <path class="jar-glass" d="M46 63v76c0 15 12 27 27 27h54c15 0 27-12 27-27V63" />
                <path class="jar-shine left" d="M49 73c-5 25-5 49 2 72" />
                <path class="jar-shine right" d="M151 73c5 25 5 49-2 72" />

                <g class="pet-face">
                  <circle class="jar-cheek left" cx="80" cy="119" r="6.3" />
                  <circle class="jar-cheek right" cx="120" cy="119" r="6.3" />
                  ${faceMarkup(status)}
                </g>
              </g>

              <g class="pet-lid">
                <path class="cloth-top" d="M53 31h94c16 0 27 11 27 26 0 10-7 18-15 22-12 5-23-2-36 2-14 5-25-3-40 1-17 4-28-2-37-9-9-7-12-16-9-25 3-10 10-17 16-17Z" />
                <path class="cloth-skirt" d="M34 66c14 12 28 12 41 5 12 9 29 9 44 1 14 7 29 5 46-7 4 12-1 24-13 29-12 4-23-3-35 3-13 7-28 6-42-1-11 5-24 4-36-2-11-5-14-17-5-28Z" />
                <path class="twine-line" d="M37 66c37 11 89 11 126 0" />
                <path class="bow-loop left" d="M95 62c-17-14-30-8-29 4 2 12 17 11 29-4Z" />
                <path class="bow-loop right" d="M105 62c17-14 30-8 29 4-2 12-17 11-29-4Z" />
                <circle class="bow-knot" cx="100" cy="64" r="6" />
                <path class="bow-tail left" d="M96 69c-5 8-10 16-17 22" />
                <path class="bow-tail right" d="M104 69c5 8 10 16 17 22" />
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
