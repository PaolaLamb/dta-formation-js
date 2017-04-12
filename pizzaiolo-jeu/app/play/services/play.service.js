export class PlayService {
    constructor(RecipeService) {
        this.RecipeService = RecipeService;

        this.pizzas = [];

    }

    open(cb) {
        let getRandomPizza = () => {
            this.RecipeService.getRandomRecipe()
                .then(recipe => ({ id: recipe.id, recipe: recipe.name, toppings: [] }))
                .then(pizza => this.pizzas.push(pizza))
                .then(() => {
                    if (this.pizzas.length > 10) {
                        clearInterval(this.interval);
                        //alert("YOU LOSE");
                    }

                })

        }
        this.interval = setInterval(getRandomPizza, 1000);
    }



}