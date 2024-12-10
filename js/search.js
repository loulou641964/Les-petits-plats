// Fonction de recherche principale
const mainSearch = (term) => {
    const lowerTerm = term.toLowerCase().trim();
    return recipes.filter(({ name, description, ingredients }) => 
        name.toLowerCase().startsWith(lowerTerm) ||
        description.toLowerCase().includes(lowerTerm) ||
        ingredients.some(({ ingredient }) => ingredient.toLowerCase().startsWith(lowerTerm))
    );
};

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

const searchInput = document.querySelector(".search-input");
const searchIcon = document.querySelector(".search-icon");

searchIcon.addEventListener("click", filterRecipes);
searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") filterRecipes();
});
