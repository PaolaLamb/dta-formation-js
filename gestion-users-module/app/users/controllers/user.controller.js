export class UserController {
    constructor(UsersService, $routeParams, $location, AlertService) {
        this.UsersService = UsersService;
        this.$location = $location;
        this.AlertService = AlertService

        if ($routeParams.id) {
            this.UsersService.getUser($routeParams.id)
                .then(user => this.user = user);
        } else this.user = {};
    }

    save(userForm) {
        if (userForm.$valid) {
            this.UsersService.saveUser(this.user)
                .then(() => this.AlertService.addAlert('Sauvegarde réussie'))
                .then(() => this.$location.path('/users'))
                .catch(() => this.AlertService.addAlert('Echec sauvegarde', 'danger'));
        }
    }
}