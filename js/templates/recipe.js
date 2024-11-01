function recipeTemplate(recipe) {
  return `
    <article class="recipe-card">
      <img src="./assets/images/${recipe.image}" alt="${recipe.name}" class="recipe-image">
      <div class="recipe-content">
        <h3 class="recipe-title">${recipe.name}</h3>
        
        <!-- Section des ingrédients -->
        <div class="recipe-section">
          <h4 class="recipe-subtitle">INGRÉDIENTS</h4>
          <ul class="ingredients-list">
            ${recipe.ingredients.map(ingredient => `
              <li>
                <span class="ingredient-quantity">${ingredient.quantity || ''} ${ingredient.unit || ''}</span>
                <span class="ingredient-name">${ingredient.ingredient}</span>
              </li>`).join('')}
          </ul>
        </div>
        
        <!-- Section des instructions -->
        <div class="recipe-section">
          <h4 class="recipe-subtitle">RECETTE</h4>
          <p class="recipe-instructions">${recipe.description || 'Instructions non disponibles'}</p>
        </div>
      </div>
    </article>
  `;
}
export default recipeTemplate;


