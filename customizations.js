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

  function openEye(x, y, size = 14) {
    return `
      <g class="eye-group" transform="translate(${x} ${y})">
        <g class="eye-blink">
          <ellipse class="eye-base" cx="0" cy="0" rx="${size * 0.92}" ry="${size}" />
          <circle class="eye-iris" cx="0" cy="1.1" r="${size * 0.88}" />
          <circle class="eye-pupil" cx="0.8" cy="1.9" r="${size * 0.52}" />
          <ellipse class="eye-shade" cx="2.4" cy="${size * 0.15}" rx="${size * 0.40}" ry="${size * 0.55}" />
          <circle class="eye-highlight major" cx="${-size * 0.34}" cy="${-size * 0.33}" r="${size * 0.34}" />
          <circle class="eye-highlight minor" cx="${size * 0.30}" cy="${size * 0.38}" r="${size * 0.16}" />
        </g>
      </g>
    `;
  }

  function faceMarkup(status) {
    if (status === "sleeping") {
      return `
        <path class="jar-brow soft left" d="M78 116q8-5 17 0" />
        <path class="jar-brow soft right" d="M105 116q8-5 17 0" />
        <path class="jar-eye sleeping left" d="M78 124q8 7 17 0" />
        <path class="jar-eye sleeping right" d="M105 124q8 7 17 0" />
        <path class="jar-mouth sleeping" d="M91 146q9 5 18 0" />
      `;
    }

    if (status === "hungry") {
      return `
        <path class="jar-brow left" d="M77 111q9-8 20-2" />
        <path class="jar-brow right" d="M123 111q-9-8-20-2" />
        ${openEye(88, 127, 13)}
        ${openEye(112, 127, 13)}
        <path class="jar-mouth hungry" d="M92 148q8-8 16 0" />
      `;
    }

    if (status === "overdue") {
      return `
        <path class="jar-brow worried left" d="M76 111q11-11 21-3" />
        <path class="jar-brow worried right" d="M124 111q-11-11-21-3" />
        ${openEye(87, 127, 13.4)}
        ${openEye(113, 127, 13.4)}
        <path class="jar-mouth overdue" d="M95 149q5-7 10 0" />
      `;
    }

    return `
      ${openEye(88, 126, 14)}
      ${openEye(112, 126, 14)}
      <path class="jar-mouth happy" d="M90 146q10 13 20 0" />
      <path class="jar-mouth-tongue" d="M96 156q4 4 8 0" />
    `;
  }

  function statusExtras(status) {
    if (status === "sleeping") {
      return `
        <g class="pet-zzz">
          <text x="148" y="72">z</text>
          <text x="160" y="56">z</text>
          <text x="171" y="40">z</text>
        </g>
      `;
    }

    if (status === "ready") {
      return `
        <g class="pet-sparkles">
          <path d="M37 104l4 8 8 4-8 4-4 8-4-8-8-4 8-4z" />
          <path d="M165 98l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" />
          <path d="M152 160l3 6 6 3-6 3-3 6-3-6-6-3 6-3z" />
        </g>
      `;
    }

    if (status === "hungry") {
      return `
        <g class="pet-hungry-mark">
          <circle cx="154" cy="80" r="10" />
          <path d="M154 74v8" />
          <circle class="dot" cx="154" cy="87" r="1.6" />
        </g>
      `;
    }

    if (status === "overdue") {
      return `
        <g class="pet-alert-marks">
          <path d="M34 95l-12-15" />
          <path d="M48 88l-5-18" />
          <path d="M166 95l12-15" />
          <path d="M152 88l5-18" />
          <path class="sweat" d="M56 121c7-11 15-8 11 3-2 6-7 10-12 8-4-2-2-6 1-11Z" />
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
            <stop offset="0" stop-color="#fff3dc" />
            <stop offset="1" stop-color="#e9c686" />
          </linearGradient>
          <linearGradient id="clothSkirtFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#fdefcc" />
            <stop offset="1" stop-color="#dfb170" />
          </linearGradient>
          <linearGradient id="twineFill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#f6b13c" />
            <stop offset="1" stop-color="#9f5918" />
          </linearGradient>
          <linearGradient id="starterFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#fff5cf" />
            <stop offset="0.58" stop-color="#f2d48f" />
            <stop offset="1" stop-color="#deab55" />
          </linearGradient>
          <radialGradient id="starterGlow" cx="50%" cy="24%" r="78%">
            <stop offset="0" stop-color="rgba(255,255,255,0.60)" />
            <stop offset="1" stop-color="rgba(255,255,255,0)" />
          </radialGradient>
          <linearGradient id="eyeIris" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#5a2b0d" />
            <stop offset="1" stop-color="#110703" />
          </linearGradient>
          <linearGradient id="limbFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#fce9bf" />
            <stop offset="1" stop-color="#e4af5c" />
          </linearGradient>
          <clipPath id="jarClip">
            <path d="M52 80c0-10 4-16 12-20 9-4 18-5 36-5s27 1 36 5c8 4 12 10 12 20v68c0 22-14 36-35 36H87c-21 0-35-14-35-36Z" />
          </clipPath>
        </defs>

        <ellipse class="pet-ground-shadow" cx="100" cy="188" rx="38" ry="7" />

        <g class="pet-bob">
          ${statusExtras(status)}

          <g class="pet-arms">
            <ellipse class="pet-arm left" cx="29" cy="136" rx="12.3" ry="14.3" />
            <ellipse class="pet-arm right" cx="171" cy="136" rx="12.3" ry="14.3" />
          </g>

          <g class="jar-fill-layer">
            <path class="jar-fill" d="M52 80c0-10 4-16 12-20 9-4 18-5 36-5s27 1 36 5c8 4 12 10 12 20v68c0 22-14 36-35 36H87c-21 0-35-14-35-36Z" />
            <path class="jar-neck-shadow" d="M67 70c8-4 18-5 33-5s25 1 33 5" />
          </g>

          <g class="starter-layer" clip-path="url(#jarClip)">
            <path class="starter-shape" d="M58 101c11-4 22 1 32-1 13-3 24 3 36 0 11-2 21 0 32 5v44c0 17-12 28-29 28H71c-18 0-30-11-30-28Z" />
            <ellipse class="starter-glow" cx="101" cy="111" rx="52" ry="33" />
            <path class="starter-foam" d="M62 96c10-5 19 2 29-1 12-4 24 4 36 0 10-2 19 0 27 4" />
            <g class="foam-bubbles">
              <circle cx="67" cy="99" r="5.2" />
              <circle cx="81" cy="98" r="6" />
              <circle cx="95" cy="99" r="4.8" />
              <circle cx="110" cy="98" r="6.2" />
              <circle cx="124" cy="99" r="5" />
              <circle cx="138" cy="99" r="5.8" />
            </g>
            <g class="pet-bubbles">
              <circle cx="73" cy="118" r="3.6" />
              <circle cx="86" cy="112" r="2.7" />
              <circle cx="101" cy="118" r="3.1" />
              <circle cx="116" cy="113" r="2.8" />
              <circle cx="128" cy="119" r="3.3" />
              <circle cx="71" cy="137" r="6.1" />
              <circle cx="89" cy="133" r="2.6" />
              <circle cx="108" cy="141" r="4.1" />
              <circle cx="125" cy="137" r="3.5" />
              <circle cx="139" cy="133" r="5.0" />
              <circle cx="77" cy="156" r="4.1" />
              <circle cx="95" cy="151" r="3.0" />
              <circle cx="117" cy="157" r="5.3" />
              <circle cx="134" cy="152" r="3.6" />
            </g>
          </g>

          <g class="face-layer">
            <circle class="jar-cheek left" cx="74" cy="138" r="8.2" />
            <circle class="jar-cheek right" cx="126" cy="138" r="8.2" />
            ${faceMarkup(status)}
          </g>

          <g class="glass-details">
            <path class="jar-inner-line" d="M58 84c0-8 3-12 9-15 8-4 16-5 33-5s25 1 33 5c6 3 9 7 9 15v64c0 18-12 30-30 30H88c-18 0-30-12-30-30Z" />
            <path class="jar-shine left" d="M61 84c-5 14-6 46-1 71" />
            <path class="jar-shine left-inner" d="M69 95c-2 10-2 35 1 54" />
            <path class="jar-shine right" d="M138 85c4 13 5 42 1 67" />
          </g>

          <g class="jar-outline-layer">
            <path class="jar-outline-main" d="M52 80c0-10 4-16 12-20 9-4 18-5 36-5s27 1 36 5c8 4 12 10 12 20v68c0 22-14 36-35 36H87c-21 0-35-14-35-36Z" />
          </g>

          <g class="pet-lid">
            <path class="cloth-top" d="M52 24c21-4 75-4 96 0 12 2 22 11 22 22 0 14-8 23-24 24H54c-16-1-24-10-24-24 0-11 10-20 22-22Z" />
            <path class="cloth-texture top-a" d="M58 37c12-6 24 4 38-2 14-5 24 5 39 0 11-4 21-3 28 2" />
            <path class="cloth-skirt" d="M30 67c13 9 25 14 38 10 11 6 25 7 38 2 13 6 29 5 49-8 3 10 1 19-6 24-9 6-21 5-35 5H76c-13 0-25 2-36-4-9-5-13-14-10-29Z" />
            <path class="twine-line" d="M34 64c37 12 87 12 126 0" />
            <path class="bow-loop left" d="M118 61c-16-12-28-8-28 4 1 11 15 11 28-4Z" />
            <path class="bow-loop right" d="M133 60c18-12 31-6 31 5 0 12-16 13-31-5Z" />
            <circle class="bow-knot" cx="126" cy="62" r="5.8" />
            <path class="bow-tail left" d="M123 67c-4 8-7 16-12 22" />
            <path class="bow-tail right" d="M130 67c5 10 11 19 15 25" />
          </g>

          <g class="pet-legs">
            <ellipse class="pet-leg left" cx="84" cy="183" rx="11.5" ry="9" />
            <ellipse class="pet-leg right" cx="116" cy="183" rx="11.5" ry="9" />
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
