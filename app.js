//this combines the user's alcohol choice with the partial api url to pull data of the chosen alcohol
const alcoholChoice = document.querySelector('#alcohol')
alcoholChoice.addEventListener('click', event => {
  const chosenAlcohol = event.target.innerText
  console.log(chosenAlcohol)

  const urlToFetch = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + chosenAlcohol
  console.log(urlToFetch)

  fetchTheDrinks(urlToFetch)
})


// churns the cocktail results of the chosen alcohol. This also assigns the cocktail ID to the id of the button.
async function fetchTheDrinks(urlToFetch) {
  const response = await fetch(urlToFetch)
  console.log('response: ', response)
  const data = await response.json()

  const cocktailDivList = document.getElementById('results')
  cocktailDivList.innerHTML = ''

  const cocktailRecipeList = document.getElementById('cocktails')
  cocktailRecipeList.innerHTML = ''

  const cocktailRandomList = document.getElementById('random-drink')
  cocktailRandomList.innerHTML = ''

  for (let x = 0; x < data.drinks.length; x++) {

    const cocktail = data.drinks[x]
    const cocktailDiv = document.createElement('div')
    cocktailDiv.setAttribute('class', 'col shadow-sm p-3 mb-5 rounded text-center')
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
    ingredientBtn.setAttribute('type', 'button')
    ingredientBtn.setAttribute('class', 'btn btn-secondary')

    ingredientBtn.innerText = "Learn to Make"
    const drinkId = cocktail.idDrink
    ingredientBtn.setAttribute('id', `${drinkId}`)
    cocktailDiv.appendChild(ingredientBtn)

    document.getElementById(drinkId).addEventListener('click', learnToMake)
    }
}

//clears the previous result and combines the id of the button to make the api call for cocktail details
const learnToMake = () => {
  console.log('i will work. testing')
  const resultsElement = document.querySelector('#cocktails')
  resultsElement.innerHTML = ''

  const cocktailRandomList = document.getElementById('random-drink')
  cocktailRandomList.innerHTML = ''

  const cocktailDivList = document.getElementById('results')
  cocktailDivList.innerHTML = ''

  const cocktailSavedDrinks = document.getElementById('fav-container')
  cocktailSavedDrinks.innerHTML = ''

  const drinkId2 = event.target.id
  console.log(drinkId2)

  const recipeToFetch = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + drinkId2
  console.log(recipeToFetch)

  recipeFetched(recipeToFetch)
}

//to save drinks
// const savedDrinks = {}

const saveDrink = (e) => { 
  const cocktailName = e.target.dataset.drinkName
  console.log(cocktailName)

  const cocktailImg = e.target.dataset.drinkImg
  console.log(cocktailImg)

// check if there is an existing drink, if there is u need to push and append
  localStorage.setItem('drinkName', cocktailName)
  localStorage.setItem('drinkImg', cocktailImg)

  console.log(localStorage.getItem('drinkName'))
  console.log(localStorage.getItem('drinkImg'))
}

//clears and fetches drink recipe, creates recipe name, img, instructions, ingredients.
async function recipeFetched(recipeToFetch){
  const response = await fetch(recipeToFetch)
  console.log('response: ', response)
  const data = await response.json()

  const cocktailRecipeList = document.getElementById('cocktails')
  cocktailRecipeList.innerHTML = ''

  const cocktailDivList = document.getElementById('results')
  cocktailDivList.innerHTML = ''

  const cocktailRandomList = document.getElementById('random-drink')
  cocktailRandomList.innerHTML = ''

  const cocktailSavedDrinks = document.getElementById('fav-container')
  cocktailSavedDrinks.innerHTML = ''

  const cocktail = data.drinks[0]
  const cocktailDiv = document.createElement('div')
  cocktailDiv.setAttribute('class', 'col shadow-sm p-3 mb-5 rounded text-center')
  cocktailDiv.setAttribute('id', 'cocktail')
  cocktailRecipeList.append(cocktailDiv)

  const cocktailImg = document.createElement('img');
  cocktailImg.src = cocktail.strDrinkThumb;
  cocktailImg.setAttribute('id', 'cocktail-img')
  cocktailImg.setAttribute('class', 'rounded mx-auto d-block img-fluid')
  cocktailDiv.appendChild(cocktailImg);

  const cocktailName = cocktail.strDrink
  const heading = document.createElement('h4')
  heading.innerHTML = cocktailName
  cocktailDiv.appendChild(heading)
    
  const cocktailIngredients = document.createElement("ul");
  cocktailDiv.appendChild(cocktailIngredients);  
    
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

  const instructions = cocktail.strInstructions
  const bodyText = document.createElement('p')
  bodyText.innerHTML = instructions
  cocktailDiv.appendChild(bodyText)

  const saveBtn = document.createElement('button')
  saveBtn.setAttribute('type', 'button')
  saveBtn.setAttribute('class', 'btn btn-secondary')
  saveBtn.dataset.drinkName = cocktailName
  saveBtn.dataset.drinkImg = cocktailImg.src

  saveBtn.innerText = "Save Drink"
  const drinkId = cocktail.idDrink
  saveBtn.setAttribute('id', `${drinkId}`)
  cocktailDiv.appendChild(saveBtn)

  document.getElementById(drinkId).addEventListener('click', saveDrink)
}

// function to show fav drink
const showFavDrink = () => {
  const cocktailRecipeList = document.getElementById('cocktails')
  cocktailRecipeList.innerHTML = ''

  const cocktailDivList = document.getElementById('results')
  cocktailDivList.innerHTML = ''

  const cocktailRandomList = document.getElementById('random-drink')
  cocktailRandomList.innerHTML = ''

  const cocktailSavedDrinks = document.getElementById('fav-container')
  cocktailSavedDrinks.innerHTML = ''

  const cocktailDiv = document.createElement('div')
  cocktailDiv.setAttribute('class', 'col shadow-sm p-3 mb-5 rounded text-center')
  cocktailDiv.setAttribute('id', 'cocktail')
  cocktailSavedDrinks.appendChild(cocktailDiv)

  const cocktailImg = document.createElement('img');
  cocktailImg.src = localStorage.getItem('drinkImg')
  cocktailImg.setAttribute('id', 'cocktail-img')
  cocktailImg.setAttribute('class', 'rounded mx-auto d-block img-fluid')
  cocktailDiv.appendChild(cocktailImg);

  const cocktailName = localStorage.getItem('drinkName')
  const heading = document.createElement('h4')
  heading.innerHTML = cocktailName
  cocktailDiv.appendChild(heading)
}

//event listener for favdrink
document.getElementById('fav-drink').addEventListener('click', showFavDrink)

//random drink btn
const randomDrinkBtn = document.querySelector('#random-button')
randomDrinkBtn.addEventListener('click', event => {
  randomDrink(randomUrl)
      }
  )

//random drink API url
const randomUrl = 'https://www.thecocktaildb.com/api/json/v1/1/random.php'

//random drink api call, creates recipe name, img, instructions, ingredients.
async function randomDrink(randomUrl){
  const response = await fetch(randomUrl)
  console.log('response: ', response)
  const data = await response.json()

  const cocktailRecipeList = document.getElementById('cocktails')
  cocktailRecipeList.innerHTML = ''

  const cocktailDivList = document.getElementById('results')
  cocktailDivList.innerHTML = ''

  const cocktailRandomList = document.getElementById('random-drink')
  cocktailRandomList.innerHTML = ''

  const cocktailSavedDrinks = document.getElementById('fav-container')
  cocktailSavedDrinks.innerHTML = ''

  const cocktail = data.drinks[0]
  const cocktailDiv = document.createElement('div')
  cocktailDiv.setAttribute('class', 'col shadow-sm p-3 mb-5 rounded text-center')
  cocktailDiv.setAttribute('id', 'cocktail')
  cocktailRandomList.append(cocktailDiv)

  const cocktailImg = document.createElement('img');
  cocktailImg.src = cocktail.strDrinkThumb;
  cocktailImg.setAttribute('id', 'cocktail-img')
  cocktailImg.setAttribute('class', 'rounded mx-auto d-block img-fluid')
  cocktailDiv.appendChild(cocktailImg);

  const cocktailName = cocktail.strDrink
  const heading = document.createElement('h4')
  heading.innerHTML = cocktailName
  cocktailDiv.appendChild(heading)
    
  const cocktailIngredients = document.createElement("ul");
  cocktailDiv.appendChild(cocktailIngredients);  
    
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

  const instructions = cocktail.strInstructions
  const bodyText = document.createElement('p')
  bodyText.innerHTML = instructions
  cocktailDiv.appendChild(bodyText)

  const saveBtn = document.createElement('button')
  saveBtn.setAttribute('type', 'button')
  saveBtn.setAttribute('class', 'btn btn-secondary')
  saveBtn.dataset.drinkName = cocktailName
  saveBtn.dataset.drinkImg = cocktailImg.src

  saveBtn.innerText = "Save Drink"
  const drinkId = cocktail.idDrink
  saveBtn.setAttribute('id', `${drinkId}`)
  cocktailDiv.appendChild(saveBtn)

  document.getElementById(drinkId).addEventListener('click', saveDrink)    
}

//social share
const viewBtn = document.querySelector("#share"),
popup = document.querySelector(".popup"),
close = popup.querySelector(".close"),
field = popup.querySelector(".field"),
input = field.querySelector("input"),
copy = field.querySelector("button");

viewBtn.onclick = ()=>{
  popup.classList.toggle("show");
}
close.onclick = ()=>{
  viewBtn.click();
}

copy.onclick = ()=>{
  input.select(); //select input value
  if(document.execCommand("copy")){ //if the selected text copy
    field.classList.add("active");
    copy.innerText = "Copied";
    setTimeout(()=>{
      window.getSelection().removeAllRanges(); //remove selection from document
      field.classList.remove("active");
      copy.innerText = "Copy";
    }, 3000);
  }
}

