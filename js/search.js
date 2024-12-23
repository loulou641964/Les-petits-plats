// search.js

import recipes from "./../data/recipes.js";

export const mainSearch = (term) => {
    const lowerTerm = term.toLowerCase().trim();
    const results = [];
    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        if (recipe.name.toLowerCase().startsWith(lowerTerm) ||
            recipe.description.toLowerCase().includes(lowerTerm)) {
            results.push(recipe);
            continue;
        }
        for (let j = 0; j < recipe.ingredients.length; j++) {
            if (recipe.ingredients[j].ingredient.toLowerCase().startsWith(lowerTerm)) {
                results.push(recipe);
                break;
            }
        }
    }
    return results;
};

export const initializeSearch = (filterRecipes, displayRecipes, updateRecipeCount, updateFilterLists) => {
    const searchInput = document.querySelector(".search-input");
    const searchIcon = document.querySelector(".search-icon");

    searchInput.addEventListener("input", (event) => {
        const searchTerm = event.target.value.trim();
        if (searchTerm.length >= 3) {
            filterRecipes();
        } else {
            displayRecipes(recipes);
            updateRecipeCount(recipes.length);
            updateFilterLists(recipes);
            filterRecipes();
        }
    });

    searchIcon.addEventListener("click", filterRecipes);
};
