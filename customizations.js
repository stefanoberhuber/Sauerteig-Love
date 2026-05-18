(function () {
  const STORE_KEY = "sauerteig-love-state-v1";
  const PET_IMAGE_SRC = "./assets/pet-sourdough-jar.png";

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

  function renderCustomPet(force) {
    const stage = document.querySelector("#petStage");
    if (!stage) return;
    if (!force && stage.querySelector(".single-pet")) return;

    const state = readState();
    const name = state.starterName || document.querySelector("#starterName")?.value.trim() || "Sauerteig";
    const status = currentStatus();

    stage.querySelector(".pet-character")?.remove();
    stage.querySelector(".custom-pet")?.remove();
    stage.querySelector(".single-pet")?.remove();

    stage.insertAdjacentHTML(
      "beforeend",
      `
        <div class="single-pet pet-state-${status}" aria-label="${name}, ein süßes Sauerteig-Pet im Glas">
          <img
            class="single-pet-image"
            src="${PET_IMAGE_SRC}"
            alt="${name}, ein süßes Sauerteig-Pet im Glas"
            draggable="false"
          />
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
