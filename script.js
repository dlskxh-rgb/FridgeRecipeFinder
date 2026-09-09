const ingredientInput =
  document.getElementById(
    "ingredientInput"
  );


const addIngredientBtn =
  document.getElementById(
    "addIngredientBtn"
  );


const ingredientList =
  document.getElementById(
    "ingredientList"
  );


const findRecipeBtn =
  document.getElementById(
    "findRecipeBtn"
  );


const recipeResults =
  document.getElementById(
    "recipeResults"
  );


const favoriteList =
  document.getElementById(
    "favoriteList"
  );


// Load ingredients

let ingredients =
  JSON.parse(
    localStorage.getItem(
      "ingredients"
    )
  ) || [];


// Load favorites

let favorites =
  JSON.parse(
    localStorage.getItem(
      "favorites"
    )
  ) || [];



/* --------------------
   INGREDIENTS
-------------------- */


function renderIngredients() {

  ingredientList.innerHTML = "";


  ingredients.forEach(
    (ingredient, index) => {

      const item =
        document.createElement(
          "div"
        );


      item.className =
        "ingredient";


      item.innerHTML = `

        <span>
          ${ingredient}
        </span>

        <button
          class="remove-btn"
          onclick="removeIngredient(${index})"
        >
          ×
        </button>

      `;


      ingredientList.appendChild(
        item
      );

    }
  );

}


function removeIngredient(index) {

  ingredients.splice(
    index,
    1
  );


  localStorage.setItem(
    "ingredients",

    JSON.stringify(
      ingredients
    )
  );


  renderIngredients();

}



addIngredientBtn.addEventListener(
  "click",

  () => {

    const ingredient =
      ingredientInput.value
        .trim()
        .toLowerCase();


    if (ingredient === "") {

      alert(
        "Please enter an ingredient."
      );

      return;

    }


    if (
      ingredients.includes(
        ingredient
      )
    ) {

      alert(
        "This ingredient is already added."
      );

      return;

    }


    ingredients.push(
      ingredient
    );


    localStorage.setItem(

      "ingredients",

      JSON.stringify(
        ingredients
      )

    );


    ingredientInput.value =
      "";


    renderIngredients();

  }

);



/* --------------------
   RECIPE SEARCH
-------------------- */


findRecipeBtn.addEventListener(

  "click",

  () => {

    recipeResults.innerHTML =
      "";


    if (
      ingredients.length === 0
    ) {

      recipeResults.innerHTML = `

        <p class="empty-message">

          Please add ingredients first.

        </p>

      `;

      return;

    }


    const results =
      recipes.map(
        recipe => {

          const matchedIngredients =
            recipe.ingredients.filter(
              ingredient =>

                ingredients.includes(
                  ingredient
                )
            );


          return {

            ...recipe,

            matchedIngredients,

            score:
              matchedIngredients.length

          };

        }
      )


      .filter(
        recipe =>

          recipe.score > 0
      )


      .sort(
        (a, b) =>

          b.score - a.score
      );



    if (
      results.length === 0
    ) {

      recipeResults.innerHTML = `

        <p class="empty-message">

          No matching recipes found.

        </p>

      `;

      return;

    }



    results.forEach(
      recipe => {

        const card =
          document.createElement(
            "div"
          );


        card.className =
          "recipe-card";


        const isFavorite =
          favorites.includes(
            recipe.name
          );


        card.innerHTML = `

          <h3>
            🍳 ${recipe.name}
          </h3>


          <p>
            ${recipe.description}
          </p>


          <p class="recipe-info">

            <strong>
              Ingredients:
            </strong>

            ${recipe.ingredients.join(
              ", "
            )}

          </p>


          <p class="match">

            Matches:

            ${recipe.matchedIngredients.join(
              ", "
            )}

          </p>


          <button

            class="favorite-btn"

            onclick="toggleFavorite(
              '${recipe.name}'
            )"

          >

            ${
              isFavorite

                ? "★ Remove Favorite"

                : "☆ Add to Favorites"
            }

          </button>

        `;


        recipeResults.appendChild(
          card
        );

      }
    );

  }

);



/* --------------------
   FAVORITES
-------------------- */


function toggleFavorite(name) {

  if (
    favorites.includes(name)
  ) {

    favorites =
      favorites.filter(

        favorite =>
          favorite !== name

      );

  }

  else {

    favorites.push(name);

  }


  localStorage.setItem(

    "favorites",

    JSON.stringify(
      favorites
    )

  );


  renderFavorites();


  findRecipeBtn.click();

}



function renderFavorites() {

  favoriteList.innerHTML =
    "";


  if (
    favorites.length === 0
  ) {

    favoriteList.innerHTML = `

      <p class="empty-message">

        No favorite recipes yet.

      </p>

    `;

    return;

  }


  favorites.forEach(
    name => {

      const recipe =
        recipes.find(

          recipe =>
            recipe.name === name

        );


      const card =
        document.createElement(
          "div"
        );


      card.className =
        "recipe-card";


      card.innerHTML = `

        <h3>
          ⭐ ${recipe.name}
        </h3>


        <p>
          ${recipe.description}
        </p>


        <button

          class="favorite-btn"

          onclick="toggleFavorite(
            '${recipe.name}'
          )"

        >

          Remove Favorite

        </button>

      `;


      favoriteList.appendChild(
        card
      );

    }
  );

}



/* --------------------
   INITIAL RENDER
-------------------- */


renderIngredients();

renderFavorites();