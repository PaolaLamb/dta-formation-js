const API_URL = "http://localhost:3000/pizzas";

let headers = new Headers();
headers.set("Content-Type", "application/json");

export class PizzasService {
    addPizza(pizza) {
        return fetch(API_URL, {
            method: "POST",
            headers,
            body: JSON.stringify(pizza)
        }).then(response => response.json());
    }

    updatePizza(pizza) {
        return fetch(`${API_URL}/${pizza.id}`, {
            method: "PUT",
            headers,
            body: JSON.stringify(pizza)
        }).then(response => response.json());
    }

    getPizzas() {
        return fetch(API_URL).then(response => response.json());
    }

    getPizza(id) {
        return fetch(`${API_URL}/${id}`).then(response => response.json());
    }

    deletePizza(id) {
        return fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        }).then(response => response.json());
    }

    deletePizzas() {
        return this.getPizzas().then(pizzas =>
            Promise.all(pizzas.map(({ id }) => this.deletePizza(id))));
    }
}