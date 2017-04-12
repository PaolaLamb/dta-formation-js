import angular from "angular";
import ngRoute from "angular-route";


import { RecipeModule } from "./recipes";
import { PlayModule } from "./play";
import { PizzasDirective } from "./directives/pizzasDirective";
import { ToppingsDirective } from "./directives/toppingsDirective";

angular.module("app", [
    ngRoute,
    RecipeModule,
    PlayModule
])

.config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
        .when("/play", {
            controller: "PlayController",
            controllerAs: "ctrl",
            templateUrl: "views/play.html"
        })

    .when("/recipe/:id", {
        controller: "RecipeController",
        controllerAs: "ctrl",
        templateUrl: "views/recipe.html"
    })

    .when("/", {
        controller: "HomeController",
        controllerAs: "ctrl",
        templateUrl: "views/home.html"
    })
})

.controller("HomeController", function() {
    console.log("home ctrl")
})


.directive("pizzasDirective", PizzasDirective)

.directive("toppingsDirective", ToppingsDirective)

.directive("superParagrapheDirective", function() {
    return {

        restrict: "E",
        template: " <div>  {{title}} <p ng-transclude></p> </div>",
        link(scope, element, attrs) {
            scope.title = attrs.title
        },
        scope: {},
        transclude: true
    }
})