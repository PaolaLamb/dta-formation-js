import angular from 'angular';

import { FighterComponent } from './fighter.component';
import { ArenaComponent } from "./arena.component";

angular.module('app', [])

.component('dtaFighter', FighterComponent)

.component('dtaArena', ArenaComponent)