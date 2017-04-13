class PizzasComponentController {
    constructor() {}
    getPizza(pizza) {
        this.onSelect({
            $event: pizza
        });
    }
}

export const PizzasComponent = {
    template: `
        <ul class="list-group" ng-repeat="pizza in $ctrl.pizzas track by $index">
            <button type="button" class="list-group-item" ng-click="$ctrl.getPizza(pizza)">
                <a href="javascript:history.go(-1)" type="btn" >
                    <span class="badge">?</span>
                </a>
                {{ pizza.recipe }} 
            </button>
        </ul>
        `,
    bindings: {
        pizzas: "=",
        onSelect: "&"
    },
    controller: PizzasComponentController
}