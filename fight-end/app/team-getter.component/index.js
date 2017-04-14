import template from './team-getter.html';
// import css from './team.css';

class controller {

    constructor($location, TeamService) {
        this.$location = $location;
        this.TeamService = TeamService;
        this.allTeams = this.TeamService.getAllTeams();
    }

    save(teamForm) {
        if (!teamForm.$valid) return;
        this.TeamService.getOrCreate(this.name)
        .then(team => this.$location.path(`/equipe/${team.id}`));
    }

    

}

export const TeamGetterComponent = {
    controller,
    template,
}