function recipeTemplate(recipe) {
    return `
      <article class="recipe-card">
        <img src="./assets/images/${recipe.image}" alt="${recipe.name}">
        <h3>${recipe.name}</h3>
        <p><strong>Temps de préparation :</strong> ${recipe.time} min</p>
        
        <ul class="ingredients-list">
          <strong>Ingrédients :</strong>
          ${recipe.ingredients.map(ingredient => `
            <li>
              ${ingredient.ingredient}: ${ingredient.quantity || ''} ${ingredient.unit || ''}
            </li>`).join('')}
        </ul>
        
        <p class="instructions"><strong>Instructions :</strong> ${recipe.instructions || 'Instructions non disponibles'}</p>
      </article>
    `;
  }
  
  export default recipeTemplate;
  