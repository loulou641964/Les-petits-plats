function getUstensilsFromRecipes(recipes){
    let ustensils =[]
    recipes.forEach(recipe =>{ 
        
    ustensils = ustensils.concat(recipe.ustensils)    
    })
    const ustensilsUnique  = [...new Set(ustensils)];
    return ustensils
}
function fillListWithArray(list,data){
    
}


export {getUstensilsFromRecipes };

