import { getAppliancesFromRecipes, getIngredientsFromRecipes,getUstensilsFromRecipes,fillListWithArray} from "./filters.js";  
import recipes from "./../data/recipes.js";
import recipeTemplate from "./templates/recipe.js";

// Afficher toutes les recettes
const container = document.querySelector(".container-recipes");
recipes.forEach(recipe => {
    container.innerHTML += recipeTemplate(recipe);
});

// Récupérer les données des recettes
const ingredients = getIngredientsFromRecipes(recipes);
const appliances = getAppliancesFromRecipes(recipes);
const ustensils = getUstensilsFromRecipes(recipes);

// Récupérer les conteneurs de listes
const ingredientsListContainer = document.querySelector("#ingredients-liste");
const appliancesListContainer = document.querySelector("#appareils-liste");
const ustensilsListContainer = document.querySelector("#ustensiles-liste");

// Remplir les listes initialement
fillListWithArray(ingredientsListContainer, ingredients);
fillListWithArray(appliancesListContainer, appliances);
fillListWithArray(ustensilsListContainer, ustensils);

// Gestion des chevrons pour ouvrir/fermer les menus
const handleChevronToggle = (showChevron, hideChevron, listContainer) => {
    showChevron.addEventListener("click", () => {
        listContainer.style.display = "block"; // Affiche la liste
        showChevron.style.display = "none"; // Cache le chevron bas
        hideChevron.style.display = "inline-block"; // Affiche le chevron haut
    });

    hideChevron.addEventListener("click", () => {
        listContainer.style.display = "none"; // Cache la liste
        hideChevron.style.display = "none"; // Cache le chevron haut
        showChevron.style.display = "inline-block"; // Affiche le chevron bas
    });
};

// Appliquer la gestion pour chaque filtre
const showIngredientsChevron = document.querySelector("#show-ingredients");
const hideIngredientsChevron = document.querySelector("#hide-ingredients");
handleChevronToggle(showIngredientsChevron, hideIngredientsChevron, ingredientsListContainer);

const showAppliancesChevron = document.querySelector("#show-Appareils");
const hideAppliancesChevron = document.querySelector("#hide-Appareils");
handleChevronToggle(showAppliancesChevron, hideAppliancesChevron, appliancesListContainer);

const showUstensilsChevron = document.querySelector("#show-ustensiles");
const hideUstensilsChevron = document.querySelector("#hide-ustensiles");
handleChevronToggle(showUstensilsChevron, hideUstensilsChevron, ustensilsListContainer);

// Filtrage dynamique
const handleDynamicFiltering = (inputElement, listContainer, originalData) => {
    inputElement.addEventListener("input", e => {
        const filterValue = e.target.value.toLowerCase();
        const filteredData = originalData.filter(item => 
            item.toLowerCase().includes(filterValue)
        );
        fillListWithArray(listContainer, filteredData);
    });
};

// Appliquer le filtrage dynamique pour chaque liste
const ingredientsInput = document.querySelector("#ingredients");
const appliancesInput = document.querySelector("#Appareils");
const ustensilsInput = document.querySelector("#ustensiles");

handleDynamicFiltering(ingredientsInput, ingredientsListContainer, ingredients);
handleDynamicFiltering(appliancesInput, appliancesListContainer, appliances);
handleDynamicFiltering(ustensilsInput, ustensilsListContainer, ustensils);