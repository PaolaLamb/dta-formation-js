import  angular from 'angular';
import  ngRoute from 'angular-route';

import { routes } from './routes';
import { FighterComponent } from './fighter.component';
import { ArenaComponent } from './arena.component';
import { TeamGetterComponent } from './team-getter.component';
import {TeamComponent} from './team.component';
import { OpponentComponent } from './opponent.component';

import { FightService } from './fight.service';
import { TeamService } from './team.service';
import { PeerService } from './peer.service';

angular.module('app', [
    ngRoute
])
.value('API_URL', 'http://localhost:3000/teams')
.config(routes)
.config(function ($locationProvider) {
    $locationProvider.html5Mode(true);
})

.service('FightService', FightService)
.service('TeamService', TeamService)
.service('PeerService', PeerService)

.component('dtaFighter', FighterComponent)
.component('dtaArena', ArenaComponent)
.component('dtaTeamGetter', TeamGetterComponent)
.component('dtaTeam', TeamComponent)
.component('dtaOpponent', OpponentComponent)

;