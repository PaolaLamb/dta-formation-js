export class PlayController {
    constructor(RecipeService, PlayService) {
        this.RecipeService = RecipeService;
        this.RecipeService.getAllToppings()
            .then(toppings => this.toppings = toppings);

        this.PlayService = PlayService;
        this.pizzas = PlayService.pizzas;
        this.PlayService.open();

        this.title = "Pizza";
        this.pizza = null;
    }

    getPizza(pizza) {
        this.title = pizza.recipe;
        this.pizza = pizza;
    }

    addTopping(topping) {
        if (this.pizza) {
            if (this.pizza.toppings.indexOf(topping) === -1) {
                this.pizza.toppings.push(topping);
            }
        } else this.title = "Sélectionnez une pizza";
    }


    getStatus(pizza) {
        this.RecipeService.findRecipe(pizza.recipe)
            .then(recipe => {
                recipe.toppings.reduce(
                    (acc, topping) => {
                        let first = pizza.toppings.indexOf(topping);
                        let last = pizza.toppings.lastIndexOf(topping);
                        if (first !== -1 && first === last) acc.ok++;
                        else acc.ko++;
                        console.log(acc)
                        return acc;
                    }, { ok: 0, ko: 0 }
                )
            })
            .then(acc => {
                console.log(acc)
                if (acc.ok < pizza.toppings.length) console.log("Wrong");
                else if (acc.ko > 0) console.log('In progress');
                else console.log("Complete");
            });
    };

}