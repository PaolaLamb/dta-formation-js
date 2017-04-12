import { uniq } from 'lodash';

export class RecipeService {
    constructor(API_URL, $http) {
        this.API_URL = API_URL;
        this.$http = $http;
    }

    getAllToppings() {
        return this.getRecipes()
            .then(this._extractToppings);
    }

    getRecipes() {
        return this.$http.get(this.API_URL)
            .then(response => response.data);
    }

    getRecipe(id) {
        return this.$http.get(`${this.API_URL}/${id}`)
            .then(response => response.data);
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