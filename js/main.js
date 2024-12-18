// main.js

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
    const searchTerm = searchInput.value.trim();

    let filteredRecipes = searchTerm.length >= 3 ? mainSearch(searchTerm) : recipes;

    filteredRecipes = filteredRecipes.filter(recipe => {
        const hasIngredients = selectedIngredients.every(ingredient =>
            recipe.ingredients.some(item =>
                item.ingredient.toLowerCase() === ingredient.toLowerCase()
            )
        );
        
        const hasAppliances = selectedAppliances.every(appliance =>
            recipe.appliance.toLowerCase() === appliance.toLowerCase()
        );
        
        const hasUstensils = selectedUstensils.every(ustensil =>
            recipe.ustensils.some(item =>
                item.toLowerCase() === ustensil.toLowerCase()
            )
        );

        return hasIngredients && hasAppliances && hasUstensils;
    });

    displayRecipes(filteredRecipes);
    updateRecipeCount(filteredRecipes.length);
    updateFilterLists(filteredRecipes);
};

// (gestion des chevrons, sélection des tags, etc.)
const handleChevronToggle = (showChevron, hideChevron, listContainer, input) => {
    showChevron.addEventListener("click", () => {
        listContainer.style.display = "block";
        showChevron.style.display = "none";
        hideChevron.style.display = "inline-block";
    });
    
    hideChevron.addEventListener("click", () => {
        listContainer.style.display = "none";
        hideChevron.style.display = "none";
        showChevron.style.display = "inline-block";
    });
    input?.addEventListener("focus",()=>{ 
        listContainer.style.display = "block";
        showChevron.style.display = "none";
        hideChevron.style.display = "inline-block";
        
    })
    input?.addEventListener("focusout",()=>{ 
        listContainer.style.display = "none";
        hideChevron.style.display = "none";
        showChevron.style.display = "inline-block";
        
    })
};

const showIngredientsChevron = document.querySelector("#show-ingredients");
const hideIngredientsChevron = document.querySelector("#hide-ingredients");
handleChevronToggle(showIngredientsChevron, hideIngredientsChevron, ingredientsListContainer);

const showAppliancesChevron = document.querySelector("#show-Appareils");
const hideAppliancesChevron = document.querySelector("#hide-Appareils");
handleChevronToggle(showAppliancesChevron, hideAppliancesChevron, appliancesListContainer);

const showUstensilsChevron = document.querySelector("#show-ustensiles");
const hideUstensilsChevron = document.querySelector("#hide-ustensiles");
const inputUstensils= document.querySelector("#ustensiles");
handleChevronToggle(showUstensilsChevron, hideUstensilsChevron, ustensilsListContainer, inputUstensils);

const selectedTagContainer = document.querySelector("#selected-tags");

const updateTags = () => {
    selectedTagContainer.innerHTML = '';
    
    const createTag = (tag, selectedArray, container) => {
        const span = document.createElement("span");
        span.textContent = tag;
        span.classList.add("tag");

        const closeButton = document.createElement("button");
        closeButton.textContent = "X";
        closeButton.classList.add("close-tag");

        closeButton.addEventListener("click", () => {
            selectedArray.splice(selectedArray.indexOf(tag), 1);
            updateTags();
            filterRecipes();
        });

        span.appendChild(closeButton);
        container.appendChild(span);
    };

    selectedIngredients.forEach(tag => createTag(tag, selectedIngredients, selectedTagContainer));
    selectedAppliances.forEach(tag => createTag(tag, selectedAppliances,selectedTagContainer ));
    selectedUstensils.forEach(tag => createTag(tag, selectedUstensils, selectedTagContainer));
};

const handleSelection = (listContainer, selectedArray, showChevron, hideChevron) => {
    listContainer.addEventListener("click", e => {
        if (e.target.tagName === "LI") {
            const value = e.target.textContent.trim();
            if (!selectedArray.includes(value)) {
                selectedArray.push(value);
                updateTags();
                filterRecipes();
                listContainer.style.display = "none";
                hideChevron.style.display = "none";
                showChevron.style.display = "inline-block";
            }
        }
    });
};

handleSelection(ingredientsListContainer, selectedIngredients, showIngredientsChevron, hideIngredientsChevron);
handleSelection(appliancesListContainer, selectedAppliances, showAppliancesChevron, hideAppliancesChevron);
handleSelection(ustensilsListContainer, selectedUstensils, showUstensilsChevron, hideUstensilsChevron);

// Initialisation de la recherche
initializeSearch(filterRecipes, displayRecipes, updateRecipeCount, updateFilterLists);

// Initialisation de l'affichage
displayRecipes(recipes);
