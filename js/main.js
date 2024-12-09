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

// Récupérer les données des recettes et trier par ordre alphabétique
const ingredients = getIngredientsFromRecipes(recipes).sort((a, b) => a.localeCompare(b, 'fr', { sensitivity: 'base' }));
const appliances = getAppliancesFromRecipes(recipes).sort((a, b) => a.localeCompare(b, 'fr', { sensitivity: 'base' }));
const ustensils = getUstensilsFromRecipes(recipes).sort((a, b) => a.localeCompare(b, 'fr', { sensitivity: 'base' }));

// Récupérer les conteneurs de listes
const ingredientsListContainer = document.querySelector("#ingredients-liste");
const appliancesListContainer = document.querySelector("#appareils-liste");
const ustensilsListContainer = document.querySelector("#ustensiles-liste");

// Remplir les listes initialement
fillListWithArray(ingredientsListContainer, ingredients);
fillListWithArray(appliancesListContainer, appliances);
fillListWithArray(ustensilsListContainer, ustensils);

// Fonction pour mettre à jour les listes de filtres
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
    ingredientTagContainer.innerHTML = '';
    applianceTagContainer.innerHTML = '';
    ustensilTagContainer.innerHTML = '';

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

    selectedIngredients.forEach(tag => createTag(tag, selectedIngredients, ingredientTagContainer));
    selectedAppliances.forEach(tag => createTag(tag, selectedAppliances, applianceTagContainer));
    selectedUstensils.forEach(tag => createTag(tag, selectedUstensils, ustensilTagContainer));
};

// Fonction de filtrage global
const filterRecipes = () => {
    const filteredRecipes = recipes.filter(recipe => {
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

// Gestion des clics sur les éléments de la liste
const handleSelection = (listContainer, selectedArray, showChevron, hideChevron) => {
    listContainer.addEventListener("click", e => {
        if (e.target.tagName === "LI") {
            const value = e.target.textContent.trim();
            if (!selectedArray.includes(value)) {
                selectedArray.push(value);
                updateTags();
                filterRecipes();
                listContainer.style.display = "none"; // Fermer la liste après sélection
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
