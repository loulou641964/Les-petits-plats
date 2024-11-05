import recipes from "./../data/recipes.js"
import recipeTemplate from "./templates/recipe.js"
const container= document.querySelector(".container-recipes")
recipes.forEach(recipe =>{ 
container.innerHTML+= recipeTemplate(recipe);
})