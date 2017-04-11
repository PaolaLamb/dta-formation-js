import angular from "angular";
import ngRoute from "angular-route";
import { UsersModule } from "./users";


angular.module('app', [
    UsersModule,
    ngRoute
])

.config(function($routeProvider) {
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
})

.controller("Home", function() {
    console.log("home ctrl")
})



;