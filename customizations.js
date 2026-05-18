(function () {
  const STORE_KEY = "sauerteig-love-state-v1";
  const LEGACY_PETS = ["jarling", "blobbi", "krusti", "blubbi", "wolki", "codex-blue", "codex-sprout", "codex-toast"];
  const PETS = [
    { id: "sourdough-crumb", name: "Broesel", label: "Weicher Teigfreund", className: "custom-pet-crumb" },
    { id: "sourdough-rye", name: "Krusti", label: "Roggenlaib", className: "custom-pet-rye" },
    { id: "sourdough-starter", name: "Blubbi", label: "Starterkern", className: "custom-pet-starter" },
  ];

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

  function getPet(id) {
    return PETS.find((pet) => pet.id === id) || PETS[0];
  }

  function currentStatus() {
    const label = document.querySelector("#petStatusLabel")?.textContent || "";
    if (label.includes("ÃœberfÃ¤llig") || label.includes("Ueberfaellig")) return "overdue";
    if (label.includes("Hungrig")) return "hungry";
    if (label.includes("SchlÃ¤ft") || label.includes("Schlaeft")) return "sleeping";
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

  function renderPetPicker() {
    const picker = document.querySelector("#petPicker");
    if (!picker) return;
    const state = readState();
    const activeId = getPet(state.petId).id;
    picker.innerHTML = PETS.map(
      (pet) => `
        <button class="pet-choice ${pet.id === activeId ? "active" : ""}" type="button" data-custom-pet="${pet.id}">
          <span class="pet-mini ${pet.id}" aria-hidden="true"></span>
          <span>${pet.name}</span>
          <small>${pet.label}</small>
        </button>
      `,
    ).join("");
  }

  function renderCustomPet(force) {
    const stage = document.querySelector("#petStage");
    if (!stage) return;
    if (!force && stage.firstElementChild?.classList.contains("custom-pet")) return;
    const state = readState();
    const pet = getPet(state.petId);
    const status = currentStatus();
    const eyes =
      status === "sleeping"
        ? '<path class="pet-eye" d="M49 66h16" /><path class="pet-eye" d="M95 66h16" />'
        : '<path class="pet-eye" d="M49 62q8 7 16 0" /><path class="pet-eye" d="M95 62q8 7 16 0" />';
    let mouth = '<path class="pet-mouth" d="M69 90q11 8 22 0" />';
    if (status === "hungry") mouth = '<circle class="pet-mouth-open" cx="80" cy="92" r="8" />';
    if (status === "overdue") mouth = '<path class="pet-mouth" d="M69 95q11-7 22 0" />';
    if (status === "ready") mouth = '<path class="pet-mouth" d="M66 89q14 13 28 0" />';
    const statusBadge =
      status === "sleeping" ? '<text x="122" y="34" class="pet-status-text">z</text>' :
      status === "ready" ? '<g class="pet-spark"><circle cx="26" cy="44" r="4"/><circle cx="134" cy="56" r="5"/><circle cx="122" cy="114" r="4"/></g>' :
      '';
    stage.innerHTML = `
      <div class="custom-pet ${pet.className} custom-pet-${status}" aria-label="${pet.name}">
        <svg class="pet-svg" viewBox="0 0 160 170" role="img" aria-hidden="true">
          <g class="pet-shell">
            <path class="pet-arm left" d="M28 88c-9 1-15 10-15 19 0 10 8 18 17 18 7 0 11-4 14-10l3-12-4-16c-4-5-8-6-15-5Z" />
            <path class="pet-arm right" d="M132 88c9 1 15 10 15 19 0 10-8 18-17 18-7 0-11-4-14-10l-3-12 4-16c4-5 8-6 15-5Z" />
            <path class="pet-leg left" d="M58 132c-8 8-12 15-12 23 0 7 5 11 13 11h14c7 0 12-4 12-10 0-11-8-18-15-26Z" />
            <path class="pet-leg right" d="M102 132c8 8 12 15 12 23 0 7-5 11-13 11H87c-7 0-12-4-12-10 0-11 8-18 15-26Z" />
            <path class="pet-body" d="M57 24h46c20 0 35 15 35 35v41c0 24-16 40-39 40H61c-23 0-39-16-39-40V59c0-20 15-35 35-35Z" />
            <rect class="pet-visor" x="54" y="36" width="52" height="18" rx="9" />
            <path class="pet-panel" d="M49 52h62c10 0 18 8 18 18v33c0 20-17 35-37 35H68c-20 0-37-15-37-35V70c0-10 8-18 18-18Z" />
            <path class="pet-belly" d="M54 56h52c10 0 18 8 18 18v28c0 19-15 34-34 34H70c-19 0-34-15-34-34V74c0-10 8-18 18-18Z" />
            <path class="pet-highlight" d="M62 50c-11 17-14 42-8 57" />
            <circle class="pet-crumb one" cx="68" cy="61" r="4" />
            <circle class="pet-crumb two" cx="97" cy="65" r="5" />
            <circle class="pet-crumb three" cx="106" cy="82" r="3.5" />
            <circle class="pet-bubble" cx="112" cy="58" r="3.5" />
            <circle class="pet-bubble" cx="103" cy="86" r="2.6" />
            ${eyes}
            ${mouth}
            <circle class="pet-cheek left" cx="56" cy="86" r="7" />
            <circle class="pet-cheek right" cx="104" cy="86" r="7" />
            ${statusBadge}
          </g>
        </svg>
      </div>
    `;
  }

  function syncPetUi(force) {
    syncStarterHeader();
    renderPetPicker();
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
    showToast(`${option.textContent.trim()} ist im Planer ausgewaehlt.`);
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

    document.querySelector("#petPicker")?.addEventListener("click", (event) => {
      const button = event.target.closest("[data-custom-pet]");
      if (!button) return;
      writeState({ petId: button.dataset.customPet });
      syncPetUi(true);
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
    if (!state.petId || LEGACY_PETS.includes(state.petId)) {
      writeState({ petId: PETS[0].id });
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
