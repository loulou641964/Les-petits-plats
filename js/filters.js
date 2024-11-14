function getUstensilsFromRecipes(recipes){
    let ustensils =[]
    recipes.forEach(recipe =>{ 
        
    ustensils = ustensils.concat(recipe.ustensils)    
    })
    const ustensilsUnique  = [...new Set(ustensils)];
    console.log("Ustensiles récupérés :", ustensilsUnique);
    return ustensils
}
function getAppliancesFromRecipes(recipes) {
    let appliances = [];
    recipes.forEach(recipe => {
        if (recipe.appliance) {
            appliances.push(recipe.appliance);
        }
    });
    const appliancesUnique = [...new Set(appliances)];
    console.log("Appareils récupérés :", appliancesUnique);
    return appliancesUnique;
}

function getIngredientsFromRecipes(recipes) {
    let ingredients = [];
    recipes.forEach(recipe => {
        recipe.ingredients.forEach(item => {
            ingredients.push(item.ingredient);
        });
    });
    const ingredientsUnique = [...new Set(ingredients)];
    console.log("Ingrédients récupérés :", ingredientsUnique);
    return ingredientsUnique;
}
function fillListWithArray(list, data) {
    // Vider la liste existante
    list.innerHTML = '';
    
    // Parcourir le tableau de données et créer un élément de liste pour chaque entrée
    data.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        list.appendChild(li);
    });
}

export {getUstensilsFromRecipes,getAppliancesFromRecipes,getIngredientsFromRecipes,fillListWithArray };