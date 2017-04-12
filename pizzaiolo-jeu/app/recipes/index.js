import angular from "angular";

import { RecipeService } from "./services/recipe.service";
import { RecipeController } from "./controllers/recipe.controller";


export const RecipeModule = angular.module("recipe.module", [])

.value('API_URL', 'http://localhost:3000/recipes')

.service("RecipeService", RecipeService)

.controller("RecipeController", RecipeController)

.name;