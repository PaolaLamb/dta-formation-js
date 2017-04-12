export class RecipeController {
    constructor(RecipeService, $routeParams) {
        this.RecipeService = RecipeService;
        this.RecipeService.getRecipes()
            .then(recipes => this.recipes = recipes);


        if ($routeParams.id) {
            this.RecipeService.getRecipe($routeParams.id)
                .then(recipe => this.recipe = recipe);
        } else this.recipe = {};
    }


}