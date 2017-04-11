export class RecipeService {
    constructor(API_URL) {
        this.API_URL = API_URL
    }

    getToppings() {
        return this.getRecipes()
            .then(this._extractToppings);
    }

    getRecipes() {
        if (!cacheRecipes) {
            //cacheRecipes = fetch('http://10.1.0.136:3000/recipes')
            cacheRecipes = fetch('http://localhost:3000/recipes')
                .then(response => response.json())
        }
        return cacheRecipes;
    }

    getRandomRecipe() {
        return this.getRecipes()
            .then(recipes => recipes[Math.floor(Math.random() * recipes.length)]);
    }

    findRecipe(recipeName) {
        return this.getRecipes().then(recipes => recipes.find(recipe => recipe.name === recipeName));
    }


    _extractToppings(recipes) {
        return uniq(recipes.reduce((toppings, recipe) =>
            // toppings.concat(recipe.toppings)
            [...toppings, ...recipe.toppings], []));
    }


}