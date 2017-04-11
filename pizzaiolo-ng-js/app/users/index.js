import angular from "angular";

export const UsersModule = angular.module('users.module', [])


.value('API_URL', 'http://localhost:3000/users')

.service('UsersService', class UsersService {
    constructor($http, API_URL) {
        this.$http = $http;
        this.API_URL = API_URL;
    }

    getUsers() {
        return this.$http.get(this.API_URL)
            .then(response => response.data)
    }

    saveUser(user) {
        return (user.id) ?
            this.$http.put(`${this.API_URL}/${ user.id }`, user) :
            this.$http.post(this.API_URL, user)

        .then(response => response.data);

    }

    deleteUser(user) {
        return this.$http.delete(`${this.API_URL}/${ user.id }`)
            .then(response => response.data);
    }

})

.controller('FirstController', function(UsersService) {

    UsersService.getUsers()
        .then(users => this.users = users);

    this.save = (userForm) => {
        if (userForm.$valid) {

            UsersService.saveUser(this.user)
                .then(user => this.users.push(user))

            this.user = null;
            userForm.$setPristine();
            userForm.$setUntouched();
        }
    }

    this.deleteUser = (user) => {
        UsersService.deleteUser(user)
            .catch(() => {
                console.log('ERREUR DE SUPPRESSION');
                this.users.push(user);
            })
            //.then(() => {
        this.users = this.users.filter(u => u.id !== user.id);
        //})
    }

    this.editUser = (user) => {
        this.user = angular.copy(user);
    }

}).name;