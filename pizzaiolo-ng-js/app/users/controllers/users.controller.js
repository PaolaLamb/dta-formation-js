export class UsersController {

    constructor(UsersService) {
        this.UsersService = UsersService;
        this.UsersService.getUsers()
            .then(users => this.users = users);
    }

    save(userForm) {
        if (userForm.$valid) {

            this.UsersService.saveUser(this.user)
                .then(user => this.users.push(user));

            this.user = null;
            userForm.$setPristine();
            userForm.$setUntouched();
        }
    }

    deleteUser(user) {
        this.UsersService.deleteUser(user)
            .catch(() => {
                console.log('ERREUR DE SUPPRESSION');
                this.users.push(user);
            });
        this.users = this.users.filter(u => u.id !== user.id);
    }

    editUser(user) {
        this.user = angular.copy(user);
    }

}