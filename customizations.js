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

  function openEye(x, y, size = 11) {
    return `
      <g class="eye-group" transform="translate(${x} ${y})">
        <ellipse class="eye-white" cx="0" cy="0" rx="${size * 0.92}" ry="${size}" />
        <circle class="eye-iris" cx="0" cy="1.4" r="${size * 0.86}" />
        <circle class="eye-pupil" cx="0.4" cy="2.1" r="${size * 0.48}" />
        <circle class="eye-highlight big" cx="${-size * 0.34}" cy="${-size * 0.3}" r="${size * 0.31}" />
        <circle class="eye-highlight small" cx="${size * 0.18}" cy="${size * 0.32}" r="${size * 0.13}" />
      </g>
    `;
  }

  function faceMarkup(status) {
    if (status === "sleeping") {
      return `
        <path class="jar-brow soft left" d="M84 106q6-4 14 0" />
        <path class="jar-brow soft right" d="M102 106q6-4 14 0" />
        <path class="jar-eye sleeping left" d="M84 112q7 6 14 0" />
        <path class="jar-eye sleeping right" d="M102 112q7 6 14 0" />
        <path class="jar-mouth sleeping" d="M92 129q8 5 16 0" />
      `;
    }

    if (status === "hungry") {
      return `
        <path class="jar-brow left" d="M82 103q8-7 17-2" />
        <path class="jar-brow right" d="M118 103q-8-7-17-2" />
        ${openEye(90, 114, 10)}
        ${openEye(110, 114, 10)}
        <path class="jar-mouth hungry" d="M93 131q7-6 14 0" />
      `;
    }

    if (status === "overdue") {
      return `
        <path class="jar-brow worried left" d="M81 102q10-10 18-3" />
        <path class="jar-brow worried right" d="M119 102q-10-10-18-3" />
        ${openEye(89, 114, 10.4)}
        ${openEye(111, 114, 10.4)}
        <path class="jar-mouth overdue" d="M95 131q5-7 10 0" />
      `;
    }

    return `
      ${openEye(90, 114, 10.8)}
      ${openEye(110, 114, 10.8)}
      <path class="jar-mouth happy" d="M90 130q10 12 20 0" />
      <path class="jar-mouth-tongue" d="M96 140q4 3 8 0" />
    `;
  }

  function statusExtras(status) {
    if (status === "sleeping") {
      return `
        <g class="pet-zzz">
          <text x="146" y="66">z</text>
          <text x="159" y="50">z</text>
          <text x="171" y="33">z</text>
        </g>
      `;
    }

    if (status === "ready") {
      return `
        <g class="pet-sparkles">
          <path d="M36 98l4 8 8 4-8 4-4 8-4-8-8-4 8-4z" />
          <path d="M165 92l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" />
          <path d="M153 154l3 6 6 3-6 3-3 6-3-6-6-3 6-3z" />
        </g>
      `;
    }

    if (status === "hungry") {
      return `
        <g class="pet-hungry-mark">
          <circle cx="152" cy="72" r="10" />
          <path d="M152 66v8" />
          <circle class="dot" cx="152" cy="79" r="1.6" />
        </g>
      `;
    }

    if (status === "overdue") {
      return `
        <g class="pet-alert-marks">
          <path d="M36 88l-12-15" />
          <path d="M48 82l-5-18" />
          <path d="M164 88l12-15" />
          <path d="M152 82l5-18" />
          <path class="sweat" d="M53 108c7-11 15-8 11 3-2 6-7 10-12 8-4-2-2-6 1-11Z" />
        </g>
      `;
    }

    return "";
  }

  function petSvg(status) {
    return `
      <svg class="single-pet-svg" viewBox="0 0 200 200" role="img" aria-hidden="true">
        <defs>
          <linearGradient id="clothTopFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#fff2d2" />
            <stop offset="1" stop-color="#e7be83" />
          </linearGradient>
          <linearGradient id="clothSkirtFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#fbe8bf" />
            <stop offset="1" stop-color="#d9aa67" />
          </linearGradient>
          <linearGradient id="twineFill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#efab3a" />
            <stop offset="1" stop-color="#9b5a21" />
          </linearGradient>
          <linearGradient id="starterFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#fff3c6" />
            <stop offset="0.52" stop-color="#f4d48b" />
            <stop offset="1" stop-color="#dfaa53" />
          </linearGradient>
          <linearGradient id="eyeIris" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#5c2d0f" />
            <stop offset="1" stop-color="#1d0d06" />
          </linearGradient>
        </defs>

        <ellipse class="pet-ground-shadow" cx="100" cy="184" rx="42" ry="8" />

        <g class="pet-bob">
          ${statusExtras(status)}

          <g class="pet-lid">
            <path class="cloth-top" d="M54 29c20-4 72-4 92 0 10 2 18 9 18 18 0 12-7 18-20 19H56c-13-1-20-7-20-19 0-9 8-16 18-18Z" />
            <path class="cloth-skirt" d="M34 62c12 8 26 11 39 6 12 6 28 7 40 2 13 6 29 5 50-6 2 7 0 15-7 20-10 6-22 4-35 4H79c-12 0-24 2-34-4-8-4-11-12-11-22Z" />
            <path class="twine-line" d="M36 60c36 12 87 12 126 0" />
            <path class="bow-loop left" d="M122 57c-17-13-29-8-28 3 1 12 16 12 28-3Z" />
            <path class="bow-loop right" d="M136 56c19-12 33-5 32 6-1 12-17 12-32-6Z" />
            <circle class="bow-knot" cx="129" cy="59" r="5.8" />
            <path class="bow-tail left" d="M127 65c-4 8-8 16-14 22" />
            <path class="bow-tail right" d="M133 64c6 10 12 19 17 25" />
          </g>

          <g class="pet-arms">
            <path class="pet-arm left" d="M43 128c-7 2-12 9-12 17 0 8 6 13 13 13 8 0 14-6 14-13 0-8-5-16-15-17Z" />
            <path class="pet-arm right" d="M157 128c7 2 12 9 12 17 0 8-6 13-13 13-8 0-14-6-14-13 0-8 5-16 15-17Z" />
          </g>

          <g class="pet-legs">
            <path class="pet-leg left" d="M80 169c-8 5-11 10-11 16 1 6 5 9 13 9 8 0 14-4 14-10 0-6-5-11-16-15Z" />
            <path class="pet-leg right" d="M120 169c8 5 11 10 11 16-1 6-5 9-13 9-8 0-14-4-14-10 0-6 5-11 16-15Z" />
          </g>

          <g class="jar-body">
            <path class="jar-outer" d="M57 73c0-8 4-14 11-17 9-4 18-5 32-5h0c14 0 23 1 32 5 7 3 11 9 11 17v71c0 18-13 31-31 31H88c-18 0-31-13-31-31Z" />
            <path class="starter-shape" d="M61 91c10-6 20 4 31 0 13-5 23 5 36 1 11-3 21-1 31 5v47c0 17-12 29-29 29H70c-17 0-29-12-29-29Z" />
            <path class="starter-foam" d="M65 88c11-8 20 4 30-1 12-6 23 4 35-1 11-4 21-1 28 6" />
            <g class="pet-bubbles">
              <circle cx="73" cy="98" r="6" />
              <circle cx="87" cy="104" r="3.8" />
              <circle cx="100" cy="96" r="5.2" />
              <circle cx="114" cy="103" r="3.2" />
              <circle cx="126" cy="98" r="5.4" />
              <circle cx="138" cy="106" r="3.8" />
              <circle cx="79" cy="136" r="4.4" />
              <circle cx="92" cy="149" r="5.5" />
              <circle cx="109" cy="140" r="3.8" />
              <circle cx="123" cy="152" r="5.2" />
              <circle cx="133" cy="132" r="3.6" />
            </g>

            <path class="jar-inner-line" d="M64 78c0-7 3-12 9-14 8-4 15-5 27-5h0c12 0 19 1 27 5 6 2 9 7 9 14v67c0 15-11 26-26 26H90c-15 0-26-11-26-26Z" />
            <path class="jar-shine left" d="M67 78c-4 14-5 41 0 68" />
            <path class="jar-shine right" d="M135 78c3 14 4 40 0 66" />

            <g class="pet-face">
              <circle class="jar-cheek left" cx="78" cy="126" r="7.5" />
              <circle class="jar-cheek right" cx="122" cy="126" r="7.5" />
              ${faceMarkup(status)}
            </g>
          </g>
        </g>
      </svg>
    `;
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
          ${petSvg(status)}
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
