import angular from "angular";

import { RecipeService } from "./services/recipe.service";
import { RecipeController } from "./controllers/recipe.controller";

export const RecipeModule = angular.module("recipe.module", [
    RecipeController,
    RecipeService
])

.value('API_URL', 'http://localhost:3000/users')

.service("RecipeService", RecipeService)

.controller("RecipeController", RecipeController)

.name;