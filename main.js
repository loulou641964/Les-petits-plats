import recipes from "./data/recipes.js"

const container= document.querySelector(".container-recipes")
recipes.forEach(recipe =>{
    container.innerHTML+="<h3>"+ recipe.name +"</h3>"
})
