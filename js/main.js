import { getAppliancesFromRecipes, getIngredientsFromRecipes, getUstensilsFromRecipes,fillListWithArray } from "./filters.js"
import recipes from "./../data/recipes.js"
import recipeTemplate from "./templates/recipe.js"
const container= document.querySelector(".container-recipes")
recipes.forEach(recipe =>{ 
container.innerHTML+= recipeTemplate(recipe);
})
const Ustensiles = getUstensilsFromRecipes(recipes)
const appliances = getAppliancesFromRecipes(recipes)
const Ingredients = getIngredientsFromRecipes(recipes)

const IngredientsListContainer = document.querySelector('#ingredients-liste')
fillListWithArray(IngredientsListContainer, Ingredients )
// ajouter un écouteur évenement sur imput des ingrédients.
//   quand actif on veut faire aparaitre la liste des ingredients
// quand on écrit une suite de lettre dans imput, on veut l'afficher dans la liste uniquement les ingredients avec ces lettres.
// ex : si l'on écrit to on devrait avoir tomate qui s'affiche dans la liste. ex: lait de coco disparait de liste.
