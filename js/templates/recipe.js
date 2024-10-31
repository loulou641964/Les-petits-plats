 function template (recipe){
     return`
    <article>
        <img src="./assets/images/${recipe.image}" alt="${recipe.name}"> 
        <h3>${recipe.name}</h3>
    </article>`
}
export default template