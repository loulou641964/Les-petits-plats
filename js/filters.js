function getUstensilsFromRecipes(recipes) {
  let ustensils = [];
  recipes.forEach((recipe) => {
    ustensils = ustensils.concat(recipe.ustensils);
  });
  const ustensilsUnique = [...new Set(ustensils)];
  console.log("Ustensiles récupérés (uniques) :", ustensilsUnique);
  return ustensilsUnique;
}

function getAppliancesFromRecipes(recipes) {
  let appliances = [];
  recipes.forEach((recipe) => {
    if (recipe.appliance) {
      appliances.push(recipe.appliance);
    }
  });
  const appliancesUnique = [...new Set(appliances)];
  console.log("Appareils récupérés (uniques) :", appliancesUnique);
  return appliancesUnique;
}
function getIngredientsFromRecipes(recipes) {
  let ingredients = [];
  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((item) => {
      ingredients.push(item.ingredient.toLowerCase().trim());
    });
  });

  // Supprime les doublons après normalisation
  const ingredientsUnique = [...new Set(ingredients)];

  console.log("Ingrédients récupérés (uniques) :", ingredientsUnique);
  return ingredientsUnique;
}

function fillListWithArray(list, data) {
  // Vide la liste existante
  list.innerHTML = "";

  // Parcourir le tableau de données et créer un élément de liste pour chaque entrée
  data.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });
}
const filterRecipes = (recipes,selection) => {
  const filteredRecipes = recipes.filter(recipe => {
      // Vérifier que tous les ingrédients sélectionnés sont dans la recette
      const hasIngredients = selection.selectedIngredients.every(ingredient =>
          recipe.ingredients.some(item => 
              item.ingredient.toLowerCase() === ingredient.toLowerCase()
          )
      );

      // Vérifier que l'appareil sélectionné correspond
      const hasAppliances = selection.selectedAppliances.every(appliance =>
          recipe.appliance.toLowerCase() === appliance.toLowerCase()
      );

      // Vérifier que tous les ustensiles sélectionnés sont dans la recette
      const hasUstensils = selection.selectedUstensils.every(ustensil =>
          recipe.ustensils.some(item =>
              item.toLowerCase() === ustensil.toLowerCase()
          )
      );

      return hasIngredients && hasAppliances && hasUstensils;
  });

  
  return filteredRecipes;
};

export {
  getUstensilsFromRecipes,
  getAppliancesFromRecipes,
  getIngredientsFromRecipes,
  fillListWithArray,
  filterRecipes,
};