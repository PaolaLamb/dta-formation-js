import angular from "angular";
import ngRoute from "angular-route";
import { UsersModule } from "./users";
import { AlertModule } from "./alert";

angular.module('app', [
    UsersModule,
    ngRoute,
    AlertModule
])

.config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
        .when("/", {
            controller: "Home",
            controllerAs: "ctrl",
            templateUrl: "views/home.html"
        })
        .when("/users", {
            controller: "UsersController",
            controllerAs: "ctrl",
            templateUrl: "views/users.html"
        })
        .when("/user/:id?", {
            controller: "UserController",
            controllerAs: "ctrl",
            templateUrl: "views/user.html"
        })
        .otherwise({
            redirectTo: "/"
        })
})

.controller("Home", function() {
    console.log("home ctrl")
})



;