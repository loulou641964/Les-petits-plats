// search.js

import recipes from "./../data/recipes.js";

export const mainSearch = (term) => {
    const lowerTerm = term.toLowerCase().trim();
    return recipes.filter(({ name, description, ingredients }) => 
        name.toLowerCase().startsWith(lowerTerm) ||
        description.toLowerCase().includes(lowerTerm) ||
        ingredients.some(({ ingredient }) => ingredient.toLowerCase().startsWith(lowerTerm))
    );
};

export const initializeSearch = (filterRecipes, displayRecipes, updateRecipeCount, updateFilterLists) => {
    const searchInput = document.querySelector(".search-input");
    const searchIcon = document.querySelector(".search-icon");

    searchInput.addEventListener("input", (event) => {
        const searchTerm = event.target.value.trim();
        if (searchTerm.length >= 3) {
            filterRecipes();
        } else if (searchTerm.length === 0) {
            displayRecipes(recipes);
            updateRecipeCount(recipes.length);
            updateFilterLists(recipes);
        }
    });

    searchIcon.addEventListener("click", filterRecipes);
};
