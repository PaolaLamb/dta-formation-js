export class UsersController {

    constructor(UsersService) {
        this.UsersService = UsersService;
        this.UsersService.getUsers()
            .then(users => this.users = users);
    }

    deleteUser(user) {
        this.UsersService.deleteUser(user)
            .catch(() => {
                console.log('ERREUR DE SUPPRESSION');
                this.users.push(user);
            });
        this.users = this.users.filter(u => u.id !== user.id);
    }


}