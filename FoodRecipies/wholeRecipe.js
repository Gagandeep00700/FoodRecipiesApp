const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

if (id) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(response => response.json())
    .then(data => {
      if (data.meals) {
        displayRecipe(data.meals[0]);
      }
    });
}
function displayRecipe(recipe)
{
  let container = document.getElementById('wholeRecipe');
  let ingredients = [];
  let measures = [];
  let i = 1;

while (i <= 20) {
  const ingredient = recipe[`strIngredient${i}`];
  const measure = recipe[`strMeasure${i}`];
  if (ingredient && ingredient.trim() !== "") {
    ingredients.push(ingredient);
    measures.push(measure);
  }
  i++;
}

container.innerHTML = "";

const mealImage = document.createElement("img");
mealImage.src = recipe.strMealThumb;
mealImage.style.height = "300px";
mealImage.style.borderRadius="10%"
container.appendChild(mealImage);

const mealName = document.createElement("h1");
mealName.textContent = recipe.strMeal;
mealName.style.fontSize="80px"
mealName.style.textAlign="left"
container.appendChild(mealName);


const ingredientsHeading = document.createElement("h1");
ingredientsHeading.textContent = "INGREDIENTS";
container.appendChild(ingredientsHeading);


for (let i = 0; i < ingredients.length; i++) {
  const ingredientItem = document.createElement("i");
  ingredientItem.innerHTML = `${ingredients[i]}: ${measures[i]}`;
  container.appendChild(ingredientItem);
  container.appendChild(document.createElement("br"));
}

const instructionsHeading = document.createElement("h2");
instructionsHeading.textContent = "Instructions";
container.appendChild(instructionsHeading);

const instructions = document.createElement("p");
instructions.textContent = recipe.strInstructions;
container.appendChild(instructions);

}