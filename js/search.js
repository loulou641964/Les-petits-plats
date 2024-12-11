// Fonction de recherche principale
const mainSearch = (term) => {
    const lowerTerm = term.toLowerCase().trim();
    return recipes.filter(({ name, description, ingredients }) => 
        name.toLowerCase().startsWith(lowerTerm) ||
        description.toLowerCase().includes(lowerTerm) ||
        ingredients.some(({ ingredient }) => ingredient.toLowerCase().startsWith(lowerTerm))
    );
};

// Gestion de l'entrée dans la barre de recherche
const searchInput = document.querySelector(".search-input");
const searchIcon = document.querySelector(".search-icon");

searchIcon.addEventListener("click", filterRecipes);
searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") filterRecipes();
});

// Filtrage des recettes
const filterRecipes = () => {
    const searchInput = document.querySelector(".search-input");
    const searchTerm = searchInput.value.trim();

    let filteredRecipes = searchTerm.length >= 3 ? mainSearch(searchTerm) : recipes;

    // Filtrage supplémentaire basé sur les tags
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
