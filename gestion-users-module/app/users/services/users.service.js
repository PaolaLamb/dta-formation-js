export class UsersService {
    constructor($http, API_URL, $q) {
        this.$http = $http;
        this.API_URL = API_URL;
        this.$q = $q
    }

    getUsers() {
        return this.$http.get(this.API_URL)
            .then(response => response.data)
    }


    getUser(id) {
        if (id) {
            return this.$http.get(`${this.API_URL}/${id}`)
                .then(response => response.data)
        }
        return this.$q.resolve({});
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



}