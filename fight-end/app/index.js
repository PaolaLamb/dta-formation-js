import  angular from 'angular';

import { FighterComponent } from './fighter.component';
import { ArenaComponent } from './arena.component';
import { FightService } from './fight.service';

angular.module('app', [])

.service('FightService', FightService)

.component('dtaFighter', FighterComponent)
.component('dtaArena', ArenaComponent)

;