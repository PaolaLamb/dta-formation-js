import angular from "angular";


import { UsersService } from "./services/users.service";
import { UsersController } from "./controllers/users.controller"
import { UserController } from "./controllers/user.controller"

export const UsersModule = angular.module('users.module', [

])

.value('API_URL', 'http://localhost:3000/users')

.service('UsersService', UsersService)

.controller('UsersController', UsersController)

.controller("UserController", UserController)

.name;