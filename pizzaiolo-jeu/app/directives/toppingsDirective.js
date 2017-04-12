class ToppingsDirectiveController {
    constructor() {}

    addTopping(topping) {
        this.onSelect({
            $event: topping
        })
    }
}

export function ToppingsDirective() {
    return {
        restrict: "E",
        template: `
            <ul class="list-group" ng-repeat="topping in ctrl.toppings track by $index">
            <button type="button" class="list-group-item" ng-click="ctrl.addTopping(topping)">
                {{ topping }}
            </button>
        </ul>
        `,
        bindToController: {
            toppings: "=",
            onSelect: "&"
        },
        scope: {},
        controller: ToppingsDirectiveController,
        controllerAs: "ctrl"
    }
}