function template(recipe) {
  return `
    <article class="recipe-card">
        <img src="./assets/images/${recipe.image}" alt="${recipe.name}" class="recipe-image">
        <h2>${recipe.name}</h2>
        <section class="recipe-details">
            <h3>Recette</h3>
            <p>${recipe.description}</p>
            <h3>Ingrédients</h3>
            <ul class="ingredients-list">
                ${recipe.ingredients
                  .map(
                    (ingredient) => `
                    <li>
                      <span class="ingredient-name">${ingredient.ingredient}</span><br>
                      <span class="ingredient-quantity">${ingredient.quantity || ''} ${ingredient.unit || ''}</span>
                    </li>
                  `
                  )
                  .join("")}
            </ul>
        </section>
    </article>
  `;
}
export default template;

