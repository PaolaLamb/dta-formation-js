import template from './arena.html';

class controller {

    constructor($location, FightService) {
        this.FightService = FightService;
        this.$location = $location;
    }

    $onInit(){
        if(this.FightService.teams.length === 0) {
            this.$location.path('/');
            return;
        }
        this.FightService.setSecondTeam({
            name: 'Mechants',
            fighters: [
                {
                    email: 'toto@toto.fr',
                    class: 'boss'
                }
            ]
        });
        this.FightService.generateStats();
        this.FightService.nextRound();
    }

}

export const ArenaComponent = {
    controller,
    template,
}