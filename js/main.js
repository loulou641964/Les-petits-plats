import { getAppliancesFromRecipes, getIngredientsFromRecipes, getUstensilsFromRecipes, fillListWithArray } from "./filters.js";  
import recipes from "./../data/recipes.js";
import recipeTemplate from "./templates/recipe.js";

// Initialiser les sélections
const selectedIngredients = [];
const selectedAppliances = [];
const selectedUstensils = [];

// Fonction pour mettre à jour le nombre de recettes
const updateRecipeCount = (count) => {
    const filterText = document.querySelector(".filter-text");
    filterText.textContent = `${count} recette${count > 1 ? 's' : ''}`;
};

// Afficher toutes les recettes
const container = document.querySelector(".container-recipes");
const displayRecipes = (recipesToDisplay) => {
    container.innerHTML = ''; // Efface les recettes actuelles
    recipesToDisplay.forEach(recipe => {
        container.innerHTML += recipeTemplate(recipe); // Ajoute les recettes filtrées
    });
    updateRecipeCount(recipesToDisplay.length); // Mise à jour du compteur
};
displayRecipes(recipes); // Affiche toutes les recettes initialement
updateRecipeCount(recipes.length); // Initialise le compteur

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

// Gestion des conteneurs pour les tags
const ingredientTagContainer = document.querySelector("#ingredients-tags");
const applianceTagContainer = document.querySelector("#appareils-tags");
const ustensilTagContainer = document.querySelector("#ustensiles-tags");

// Mise à jour des tags affichés
const updateTags = () => {
    // Nettoyer les conteneurs avant de les remplir
    ingredientTagContainer.innerHTML = '';
    applianceTagContainer.innerHTML = '';
    ustensilTagContainer.innerHTML = '';

    // Ajouter les tags pour les ingrédients
    selectedIngredients.forEach(tag => {
        const span = document.createElement("span");
        span.textContent = tag;
        span.classList.add("tag");
        span.addEventListener("click", () => {
            selectedIngredients.splice(selectedIngredients.indexOf(tag), 1);
            updateTags();
            filterRecipes();
        });
        ingredientTagContainer.appendChild(span);
    });

    // Ajouter les tags pour les appareils
    selectedAppliances.forEach(tag => {
        const span = document.createElement("span");
        span.textContent = tag;
        span.classList.add("tag");
        span.addEventListener("click", () => {
            selectedAppliances.splice(selectedAppliances.indexOf(tag), 1);
            updateTags();
            filterRecipes();
        });
        applianceTagContainer.appendChild(span);
    });

    // Ajouter les tags pour les ustensiles
    selectedUstensils.forEach(tag => {
        const span = document.createElement("span");
        span.textContent = tag;
        span.classList.add("tag");
        span.addEventListener("click", () => {
            selectedUstensils.splice(selectedUstensils.indexOf(tag), 1);
            updateTags();
            filterRecipes();
        });
        ustensilTagContainer.appendChild(span);
    });
};

// Fonction de filtrage global
const filterRecipes = () => {
    const filteredRecipes = recipes.filter(recipe => {
        // Vérifier que tous les ingrédients sélectionnés sont dans la recette
        const hasIngredients = selectedIngredients.every(ingredient =>
            recipe.ingredients.some(item => 
                item.ingredient.toLowerCase() === ingredient.toLowerCase()
            )
        );

        // Vérifier que l'appareil sélectionné correspond
        const hasAppliances = selectedAppliances.every(appliance =>
            recipe.appliance.toLowerCase() === appliance.toLowerCase()
        );

        // Vérifier que tous les ustensiles sélectionnés sont dans la recette
        const hasUstensils = selectedUstensils.every(ustensil =>
            recipe.ustensils.some(item =>
                item.toLowerCase() === ustensil.toLowerCase()
            )
        );

        return hasIngredients && hasAppliances && hasUstensils;
    });

    // Afficher les recettes filtrées
    displayRecipes(filteredRecipes);
    updateRecipeCount(filteredRecipes.length); // Mise à jour du compteur après filtrage
};

// Gestion des clics sur les éléments de la liste
const handleSelection = (listContainer, selectedArray, showChevron, hideChevron) => {
    listContainer.addEventListener("click", e => {
        if (e.target.tagName === "LI") {
            const value = e.target.textContent.trim();
            if (!selectedArray.includes(value)) {
                selectedArray.push(value);
                updateTags();
                filterRecipes();
                
                // Fermer la liste
                listContainer.style.display = "none";
                hideChevron.style.display = "none";
                showChevron.style.display = "inline-block";
            }
        }
    });
};

// Appliquer la gestion pour chaque liste
handleSelection(ingredientsListContainer, selectedIngredients, showIngredientsChevron, hideIngredientsChevron);
handleSelection(appliancesListContainer, selectedAppliances, showAppliancesChevron, hideAppliancesChevron);
handleSelection(ustensilsListContainer, selectedUstensils, showUstensilsChevron, hideUstensilsChevron);