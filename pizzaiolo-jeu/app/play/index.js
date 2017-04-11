import angular from "angular";

import { PlayController } from "./controllers/play.controller";
import { PlayService } from "./services/play.service";

export const PlayModule = angular.module("play.module", [])

.service("PlayService", PlayService)

.controller("PlayController", PlayController)

.name;