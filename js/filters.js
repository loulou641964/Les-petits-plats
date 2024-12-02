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

function fillListWithArray(list, data,selection) {
  // Vide la liste existante
  list.innerHTML = "";

  // Parcourir le tableau de données et créer un élément de liste pour chaque entrée
  data.forEach((item) => {
    const li = document.createElement("li");
    li.addEventListener("click",e=>{
      console.log(item,list.id)
      const span =document.createElement("span")
      if (list.id ==="ingredients-liste"){
        span.dataset.type="ingredients"
        selection.push(item)
        console.log(selection)
    }
    span.textContent = item
    document.querySelector("#selection-tag").appendChild (span)
    })
    li.textContent = item;
    list.appendChild(li);
  });
}

export {
  getUstensilsFromRecipes,
  getAppliancesFromRecipes,
  getIngredientsFromRecipes,
  fillListWithArray,
};
