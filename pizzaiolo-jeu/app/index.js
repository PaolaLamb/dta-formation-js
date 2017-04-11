angular.module("app", [])

.config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
        .when("/play", {
            controller: "PlayController",
            controllerAs: "ctrl",
            templateUrl: "views/play.html"
        })

    .when("/pizza/:id", {
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