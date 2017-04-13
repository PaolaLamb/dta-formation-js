class PizzasDirectiveController {
    constructor() {}
    getPizza(pizza) {
        this.onSelect({
            $event: pizza
        });
    }
}

export function PizzasDirective() {
    return {
        restrict: 'E',
        template: `
        <ul class="list-group" ng-repeat="pizza in ctrl.pizzas track by $index">
            <button type="button" class="list-group-item" ng-click="ctrl.getPizza(pizza)">
                <a href="/recipe/{{pizza.id}}" type="btn" >
                    <span class="badge">?</span>
                </a>
                {{ pizza.recipe }} 
            </button>
        </ul>
        `,
        bindToController: {
            pizzas: "=",
            onSelect: "&"
        },
        scope: {},
        controller: PizzasDirectiveController,
        controllerAs: 'ctrl'
    }
}