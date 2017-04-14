import template from './team.html';
import css from './team.css';

class controller {

    constructor($location ,$routeParams, TeamService, FightService) {
        this.$location = $location;
        this.id = $routeParams.id;
        this.TeamService = TeamService;
        this.FightService = FightService;
    }

    $onInit() {
        this.TeamService.getTeam(this.id)
        .then(team => this.team = team);
        this.fighter = {
            email: '',
            class: 'dps'
        }
    }

    // @TODO : check email + unicité dans l'équipe
    // @TODO : virer emails vides
    save(teamForm) {
        if (!teamForm.$valid) return;
        this.TeamService.put(this.team)
        .then(team => {
            this.FightService.setFirstTeam(team);
            this.$location.path('/adversaire')   
        });
    }

    // @TODO : check email + unicité dans l'équipe
    addInputFighter() {
        this.team.fighters.push(angular.copy(this.fighter));
        this.fighter = {
            email: '',
            class: 'dps'
        }
    }

}

export const TeamComponent = {
    controller,
    template,
}
