function template(recipe) {
  return `
    <article class="recipe-card">
        <div class="image-container">
          <img src="./assets/images/${recipe.image}" alt="${recipe.name}" class="recipe-image">
          <span class="recipe-timer">${recipe.time} min</span>
        </div>
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
document.addEventListener("DOMContentLoaded", () => {
  const tagSearchInputs = document.querySelectorAll(".tag-search-input");

  tagSearchInputs.forEach(input => {
    input.addEventListener("input", function () {
      const listType = this.dataset.list;
      const listItems = document.querySelectorAll(`#${listType}-liste li`);
      const searchTerm = this.value.toLowerCase();

      listItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(searchTerm) ? "block" : "none";
      });
    });
  });
});

export default template;