import { getAppliancesFromRecipes, getIngredientsFromRecipes, getUstensilsFromRecipes, fillListWithArray } from "./filters.js";
import recipes from "./../data/recipes.js";
import recipeTemplate from "./templates/recipe.js";
var selected_ingredients = []

// Afficher toutes les recettes au chargement
const container = document.querySelector(".container-recipes");
const displayRecipes = (recipesToDisplay) => {
    container.innerHTML = ''; // Efface les recettes actuelles
    recipesToDisplay.forEach(recipe => {
        container.innerHTML += recipeTemplate(recipe); // Ajoute les recettes filtrées
    });
};
displayRecipes(recipes); // Affiche toutes les recettes initialement

// Récupérer les données des recettes
const ingredients = getIngredientsFromRecipes(recipes);
const appliances = getAppliancesFromRecipes(recipes);
const ustensils = getUstensilsFromRecipes(recipes);

// Récupérer les conteneurs de listes
const ingredientsListContainer = document.querySelector("#ingredients-liste");
const appliancesListContainer = document.querySelector("#appareils-liste");
const ustensilsListContainer = document.querySelector("#ustensiles-liste");

// Remplir les listes initialement
fillListWithArray(ingredientsListContainer, ingredients,selected_ingredients);
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

// Fonctions pour filtrer les recettes
const filterRecipesByIngredient = (searchTerm) => {
    return recipes.filter(recipe =>
        recipe.ingredients.some(item =>
            item.ingredient.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
};

const filterRecipesByAppliance = (searchTerm) => {
    return recipes.filter(recipe =>
        recipe.appliance.toLowerCase().includes(searchTerm.toLowerCase())
    );
};

const filterRecipesByUstensil = (searchTerm) => {
    return recipes.filter(recipe =>
        recipe.ustensils.some(ustensil =>
            ustensil.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
};

// Gestion de la recherche dynamique des recettes
const handleRecipeFiltering = (inputElement, filterFunction) => {
    inputElement.addEventListener("input", e => {
        const searchTerm = e.target.value.trim(); // Texte saisi
        const filteredRecipes = filterFunction(searchTerm); // Filtrer les recettes
        displayRecipes(filteredRecipes); // Mettre à jour l'affichage
    });
};

// Appliquer la recherche dynamique pour chaque filtre
const ingredientsInput = document.querySelector("#ingredients");
const appliancesInput = document.querySelector("#Appareils");
const ustensilsInput = document.querySelector("#ustensiles");

handleRecipeFiltering(ingredientsInput, filterRecipesByIngredient);
handleRecipeFiltering(appliancesInput, filterRecipesByAppliance);
handleRecipeFiltering(ustensilsInput, filterRecipesByUstensil);

// Filtrage dynamique pour les listes (ingrédients, appareils, ustensiles)
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
handleDynamicFiltering(ingredientsInput, ingredientsListContainer, ingredients);
handleDynamicFiltering(appliancesInput, appliancesListContainer, appliances);
handleDynamicFiltering(ustensilsInput, ustensilsListContainer, ustensils);
