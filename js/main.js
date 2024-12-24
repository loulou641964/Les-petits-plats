// Importations nécessaires
import { getAppliancesFromRecipes, getIngredientsFromRecipes, getUstensilsFromRecipes, fillListWithArray } from "./filters.js";
import recipes from "./../data/recipes.js";
import recipeTemplate from "./templates/recipe.js";
import { mainSearch, initializeSearch } from "./search.js";

// Sélections initialisées
const selectedIngredients = [], selectedAppliances = [], selectedUstensils = [];

// Mise à jour du compteur
const updateRecipeCount = (count) => {
    document.querySelector(".filter-text").textContent = `${count} recette${count > 1 ? 's' : ''}`;
};

// Affichage des recettes
const displayRecipes = (recipesToDisplay) => {
    const container = document.querySelector(".container-recipes");
    container.innerHTML = recipesToDisplay.map(recipeTemplate).join('');
    updateRecipeCount(recipesToDisplay.length);
};

// Gestion des listes de filtres
const ingredients = getIngredientsFromRecipes(recipes).sort((a, b) => a.localeCompare(b, 'fr', { sensitivity: 'base' }));
const appliances = getAppliancesFromRecipes(recipes).sort((a, b) => a.localeCompare(b, 'fr', { sensitivity: 'base' }));
const ustensils = getUstensilsFromRecipes(recipes).sort((a, b) => a.localeCompare(b, 'fr', { sensitivity: 'base' }));

const ingredientsListContainer = document.querySelector("#ingredients-liste");
const appliancesListContainer = document.querySelector("#appareils-liste");
const ustensilsListContainer = document.querySelector("#ustensiles-liste");

fillListWithArray(ingredientsListContainer, ingredients);
fillListWithArray(appliancesListContainer, appliances);
fillListWithArray(ustensilsListContainer, ustensils);

const updateFilterLists = (filteredRecipes) => {
    const updatedIngredients = getIngredientsFromRecipes(filteredRecipes)
        .filter(ingredient => !selectedIngredients.includes(ingredient))
        .sort((a, b) => a.localeCompare(b, 'fr', { sensitivity: 'base' }));
    const updatedAppliances = getAppliancesFromRecipes(filteredRecipes)
        .filter(appliance => !selectedAppliances.includes(appliance))
        .sort((a, b) => a.localeCompare(b, 'fr', { sensitivity: 'base' }));
    const updatedUstensils = getUstensilsFromRecipes(filteredRecipes)
        .filter(ustensil => !selectedUstensils.includes(ustensil))
        .sort((a, b) => a.localeCompare(b, 'fr', { sensitivity: 'base' }));

    fillListWithArray(ingredientsListContainer, updatedIngredients);
    fillListWithArray(appliancesListContainer, updatedAppliances);
    fillListWithArray(ustensilsListContainer, updatedUstensils);
};

const filterRecipes = () => {
    const searchInput = document.querySelector(".search-input");
    const searchTerm = searchInput.value.trim().toLowerCase();
    let filteredRecipes = searchTerm.length >= 3 ? mainSearch(searchTerm) : recipes;

    filteredRecipes = filteredRecipes.filter(recipe => {
        const hasIngredients = selectedIngredients.every(ingredient =>
            recipe.ingredients.some(item => item.ingredient.toLowerCase().includes(ingredient.toLowerCase()))
        );
        const hasAppliances = selectedAppliances.every(appliance =>
            recipe.appliance.toLowerCase().includes(appliance.toLowerCase())
        );
        const hasUstensils = selectedUstensils.every(ustensil =>
            recipe.ustensils.some(item => item.toLowerCase().includes(ustensil.toLowerCase()))
        );
        return hasIngredients && hasAppliances && hasUstensils;
    });

    displayRecipes(filteredRecipes);
    updateRecipeCount(filteredRecipes.length);
    updateFilterLists(filteredRecipes);
};

const handleChevronToggle = (showChevron, hideChevron, listContainer, input, items) => {
    showChevron.addEventListener("click", () => {
        listContainer.style.display = "block";
        showChevron.style.display = "none";
        hideChevron.style.display = "inline-block";
        showChevron.closest('.filter-item').classList.add('open');
    });

    hideChevron.addEventListener("click", () => {
        listContainer.style.display = "none";
        hideChevron.style.display = "none";
        showChevron.style.display = "inline-block";
        hideChevron.closest('.filter-item').classList.remove('open');
        input.value = ''; // Réinitialiser l'input
        
    });
    input?.addEventListener("focus",()=>{ 
        listContainer.style.display = "block";
        showChevron.style.display = "none";
        hideChevron.style.display = "inline-block";
        showChevron.closest('.filter-item').classList.add('open');
        
    })
    

    if (input) {
        input.addEventListener("input", () => {
            const searchTerm = input.value.toLowerCase().trim();
            const filteredItems = items.filter(item => item.toLowerCase().includes(searchTerm));
            fillListWithArray(listContainer, filteredItems);
        });
    }
};

const showIngredientsChevron = document.querySelector("#show-ingredients");
const hideIngredientsChevron = document.querySelector("#hide-ingredients");
const inputIngredients = document.querySelector("#ingredients");
handleChevronToggle(showIngredientsChevron, hideIngredientsChevron, ingredientsListContainer, inputIngredients, ingredients);

const showAppliancesChevron = document.querySelector("#show-Appareils");
const hideAppliancesChevron = document.querySelector("#hide-Appareils");
const inputAppliances = document.querySelector("#appareils");
handleChevronToggle(showAppliancesChevron, hideAppliancesChevron, appliancesListContainer, inputAppliances, appliances);

const showUstensilsChevron = document.querySelector("#show-ustensiles");
const hideUstensilsChevron = document.querySelector("#hide-ustensiles");
const inputUstensils = document.querySelector("#ustensiles");
handleChevronToggle(showUstensilsChevron, hideUstensilsChevron, ustensilsListContainer, inputUstensils, ustensils);

const selectedTagContainer = document.querySelector("#selected-tags");

const updateTags = () => {
    selectedTagContainer.innerHTML = '';
    const createTag = (tag) => {
        const span = document.createElement("span");
        span.textContent = tag;
        span.classList.add("tag");
        
        const closeButton = document.createElement("button");
        closeButton.textContent = "X";
        closeButton.classList.add("close-tag");
        
        closeButton.addEventListener("click", () => {
            if (selectedIngredients.includes(tag)) {
                selectedIngredients.splice(selectedIngredients.indexOf(tag), 1);
            } else if (selectedAppliances.includes(tag)) {
                selectedAppliances.splice(selectedAppliances.indexOf(tag), 1);
            } else if (selectedUstensils.includes(tag)) {
                selectedUstensils.splice(selectedUstensils.indexOf(tag), 1);
            }
            updateTags();
            filterRecipes();
        });
        
        span.appendChild(closeButton);
        selectedTagContainer.appendChild(span);
    };

    selectedIngredients.forEach(tag => createTag(tag));
    selectedAppliances.forEach(tag => createTag(tag));
    selectedUstensils.forEach(tag => createTag(tag));
};

const handleSelectionClickEventListener= (listContainer ,selectedArray ,showChevron ,hideChevron) =>{
  listContainer.addEventListener("click", e =>{
      if (e.target.tagName === "LI") {
          const value= e.target.textContent.trim();
          if (!selectedArray.includes(value)) {
              selectedArray.push(value);
              updateTags();
              filterRecipes();
              listContainer.style.display="none"; 
              hideChevron.style.display="none"; 
              showChevron.style.display="inline-block"; 
          }
      }
  });
}

handleSelectionClickEventListener(ingredientsListContainer ,selectedIngredients ,showIngredientsChevron ,hideIngredientsChevron);
handleSelectionClickEventListener(appliancesListContainer ,selectedAppliances ,showAppliancesChevron ,hideAppliancesChevron);
handleSelectionClickEventListener(ustensilsListContainer ,selectedUstensils ,showUstensilsChevron ,hideUstensilsChevron);

// Initialisation de la recherche
initializeSearch(filterRecipes);

// Initialisation de l'affichage
displayRecipes(recipes);
