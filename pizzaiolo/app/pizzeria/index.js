import { RecipeService } from "../recipes";
import { PizzasService } from "../pizzas";

let recipeService = new RecipeService();
let pizzasService = new PizzasService();

export class PizzeriaService {

    constructor() {
        this.pizzaCounter = 0;
    }

    open(cb) {
        pizzasService.deletePizzas();
        this.interval = setInterval(() => {
            recipeService.getRandomRecipe()
                .then(recipe => ({ recipe: recipe.name, toppings: [] }))
                .then(pizza => pizzasService.addPizza(pizza))
                .then(pizza => {
                    this.pizzaCounter++;
                    if (this.pizzaCounter > 10) {
                        clearInterval(this.interval);
                        alert("YOU LOSE");
                    }
                    return pizza;
                })
                .then(cb)
        }, 5000);
    }



}