const alcoholChoice = document.querySelector('#alcohol')
alcoholChoice.addEventListener('click', event => {
    const chosenAlcohol = event.target.innerText
    console.log(chosenAlcohol)

    const urlToFetch = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + chosenAlcohol
    console.log(urlToFetch)

    fetchTheDrinks(urlToFetch)

})



async function fetchTheDrinks(urlToFetch){
    const response = await fetch(urlToFetch)
    console.log('response: ',response)
    const data = await response.json()

    const cocktailDivList = document.getElementById('results')
    cocktailDivList.innerHTML = ''

    for (let x = 0; x < data.drinks.length; x++){

    const cocktail = data.drinks[x]
    const cocktailDiv = document.createElement('div')
    cocktailDiv.setAttribute('class', 'col shadow-sm p-3 mb-5 bg-body rounded text-center')
    cocktailDiv.setAttribute('id', 'cocktail')
    cocktailDivList.append(cocktailDiv)

    const cocktailImg = document.createElement('img');
    cocktailImg.src = cocktail.strDrinkThumb;
    cocktailImg.setAttribute('id', 'cocktail-img')
    cocktailImg.setAttribute('class', 'rounded mx-auto d-block')
    cocktailDiv.appendChild(cocktailImg);

    const cocktailName = cocktail.strDrink
    const heading = document.createElement('h4')
    heading.innerHTML = cocktailName
    cocktailDiv.appendChild(heading)

    const ingredientBtn = document.createElement('button')
    ingredientBtn.innerText = "Learn to Make"
    ingredientBtn.setAttribute('class', 'btn btn-dark')
    cocktailDiv.appendChild(ingredientBtn)

    }

}



const recipeContainer = document.getElementById('recipe')
const cocktailIngredients = document.createElement("ul");
recipeContainer.appendChild(cocktailIngredients);  

const getIngredients = Object.keys(cocktail)
  .filter(function (ingredient) {
    return ingredient.indexOf("strIngredient") == 0;
  })
  .reduce(function (ingredients, ingredient) {
    if (cocktail[ingredient] != null) {
      ingredients[ingredient] = cocktail[ingredient];
    }
    return ingredients;
  }, {});

for (let key in getIngredients) {
  let value = getIngredients[key];
  listItem = document.createElement("li");
  listItem.innerHTML = value;
  cocktailIngredients.appendChild(listItem);
}