(function () {
  const STORE_KEY = "sauerteig-love-state-v1";
  const pets = [
    { id: "sourdough-crumb", name: "Broesel", label: "Weicher Teigfreund", className: "custom-pet-crumb" },
    { id: "sourdough-rye", name: "Krusti", label: "Roggenlaib", className: "custom-pet-rye" },
    { id: "sourdough-starter", name: "Blubbi", label: "Starterkern", className: "custom-pet-starter" },
  ];

  let patchingPet = false;
  let patchingPicker = false;
  let lastDetailRecipeId = null;

  function ensurePetStyles() {
    if (document.querySelector('link[href="pet-fixes.css"]')) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "pet-fixes.css";
    document.head.append(link);
  }

  function readState() {
    try {
      return JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
    } catch {
      return {};
    }
  }

  function writeState(next) {
    localStorage.setItem(STORE_KEY, JSON.stringify({ ...readState(), ...next }));
  }

  function currentStatus() {
    const label = document.querySelector("#petStatusLabel")?.textContent || "";
    if (label.includes("Überfällig") || label.includes("Ueberfaellig")) return "overdue";
    if (label.includes("Hungrig")) return "hungry";
    if (label.includes("Schläft") || label.includes("Schlaeft")) return "sleeping";
    if (label.includes("Bereit")) return "ready";
    return "active";
  }

  function updateStarterHeader() {
    const state = readState();
    const name = state.starterName || document.querySelector("#starterName")?.value || "Blubber";
    const saved = Boolean(state.starterNameSaved);
    const title = document.querySelector("#starterNameTitle");
    const editor = document.querySelector("#starterEditor");
    if (title) title.textContent = name;
    if (editor) editor.classList.toggle("is-saved", saved);
  }

  function renderCustomPet(force = false) {
    if (patchingPet) return;
    const stage = document.querySelector("#petStage");
    if (!stage) return;
    if (!force && stage.firstElementChild?.classList.contains("custom-pet")) return;
    patchingPet = true;
    const state = readState();
    const pet = pets.find((item) => item.id === state.petId) || pets[0];
    const status = currentStatus();
    stage.innerHTML = `
      <div class="custom-pet ${pet.className} custom-pet-${status}" aria-label="${pet.name}">
        <div class="custom-pet-face">
          <span class="pet-sprinkle one"></span>
          <span class="pet-sprinkle two"></span>
          <span class="pet-sprinkle three"></span>
        </div>
      </div>
    `;
    patchingPet = false;
  }

  function renderPetPicker() {
    if (patchingPicker) return;
    const picker = document.querySelector("#petPicker");
    if (!picker) return;
    patchingPicker = true;
    const state = readState();
    const activeId = pets.some((pet) => pet.id === state.petId) ? state.petId : pets[0].id;
    picker.innerHTML = pets
      .map(
        (pet) => `
          <button class="pet-choice ${activeId === pet.id ? "active" : ""}" data-custom-pet="${pet.id}">
            <span class="pet-mini ${pet.id}" aria-hidden="true"></span>
            <span>${pet.name}</span>
            <small>${pet.label}</small>
          </button>
        `,
      )
      .join("");
    if (activeId !== state.petId) writeState({ petId: activeId });
    patchingPicker = false;
  }

  function goToPlanner(recipeId) {
    const select = document.querySelector("#plannerRecipe");
    const option = select?.querySelector(`option[value="${recipeId}"]`);
    if (!select || !option) return;
    const title = option.textContent.trim();
    const dialog = document.querySelector("#recipeDialog");
    if (dialog?.open && dialog.close) dialog.close();
    select.value = recipeId;
    document.querySelector('[data-section="planer"]')?.click();
    document.querySelector("#plannerDate")?.focus();
    window.dispatchEvent(new CustomEvent("sauerteig-toast", { detail: `${title} ist im Planer ausgewaehlt.` }));
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
      actions.append(favorite, later);

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

  function bindEvents() {
    document.querySelector("#saveName")?.addEventListener("click", () => {
      const name = document.querySelector("#starterName")?.value.trim() || "Blubber";
      writeState({ starterName: name, starterNameSaved: true });
      updateStarterHeader();
      window.setTimeout(updateStarterHeader, 40);
      window.setTimeout(() => renderCustomPet(true), 60);
    });

    document.querySelector("#editName")?.addEventListener("click", () => {
      writeState({ starterNameSaved: false });
      updateStarterHeader();
      document.querySelector("#starterName")?.focus();
    });

    document.addEventListener("click", (event) => {
      const button = event.target.closest("[data-custom-pet], [data-pet]");
      if (!button) return;
      const petId = button.dataset.customPet || button.dataset.pet;
      if (!pets.some((pet) => pet.id === petId)) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      writeState({ petId });
      renderPetPicker();
      renderCustomPet(true);
    }, true);

    document.addEventListener(
      "click",
      (event) => {
        const action = event.target.closest("[data-action]");
        if (action?.dataset.action === "detail") lastDetailRecipeId = action.dataset.id;
        if (action?.dataset.action === "plan") {
          event.preventDefault();
          event.stopPropagation();
          goToPlanner(action.dataset.id);
        }

        const detailPlan = event.target.closest("[data-detail-plan]");
        if (detailPlan) {
          event.preventDefault();
          goToPlanner(detailPlan.dataset.detailPlan);
        }
      },
      true,
    );

    window.addEventListener("sauerteig-toast", (event) => {
      const toast = document.querySelector("#toast");
      if (!toast) return;
      toast.textContent = event.detail;
      toast.classList.add("show");
      window.clearTimeout(window.__sauerteigToastTimer);
      window.__sauerteigToastTimer = window.setTimeout(() => toast.classList.remove("show"), 2800);
    });
  }

  function observe() {
    const petStage = document.querySelector("#petStage");
    if (petStage) {
      new MutationObserver(() => renderCustomPet()).observe(petStage, { childList: true });
    }

    const recipeGrid = document.querySelector("#recipeGrid");
    if (recipeGrid) {
      new MutationObserver(decorateRecipeCards).observe(recipeGrid, { childList: true, subtree: true });
    }

    const petPicker = document.querySelector("#petPicker");
    if (petPicker) {
      new MutationObserver(renderPetPicker).observe(petPicker, { childList: true });
    }

    const recipeDetail = document.querySelector("#recipeDetail");
    if (recipeDetail) {
      new MutationObserver(decorateRecipeDetail).observe(recipeDetail, { childList: true, subtree: true });
    }
  }

  function init() {
    ensurePetStyles();
    const state = readState();
    if (!state.petId || ["jarling", "blobbi", "krusti", "blubbi", "wolki", "codex-blue", "codex-sprout", "codex-toast"].includes(state.petId)) {
      writeState({ petId: pets[0].id });
    }
    updateStarterHeader();
    renderPetPicker();
    renderCustomPet(true);
    decorateRecipeCards();
    decorateRecipeDetail();
    bindEvents();
    observe();
  }

  init();
})();
