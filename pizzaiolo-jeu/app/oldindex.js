import { RecipeService } from "./recipes";
import { PizzeriaService } from "./pizzeria";
import { PizzasService } from "./pizzas";


let commandesUl = document.getElementById('commandes');
let toppingsUl = document.getElementById('toppings');
let pizzaToppingsUl = document.getElementById("pizzas");
let h2Pizza = document.getElementById("h2Pizza");

let h = document.createElement.bind(document);

let recipeService = new RecipeService();
let pizzeriaService = new PizzeriaService();
let pizzasService = new PizzasService();

let currentPizza;

// affiche le nom de la pizza dans la colonne pizza
function selectPizza(pizza) {
    if (!pizza) return;
    currentPizza = pizza;
    h2Pizza.innerText = pizza.recipe || 'Sélectionnez une pizza';
    pizzaToppingsUl.innerHTML = pizza.toppings
        .map(topping => `<li class="list-group-item">${topping}</li>`)
        .join('');
}

//récupère les ingrédients de toutes les pizzas et les stocke dans la partie Ingrédients du html, sans doublons
recipeService.getToppings()
    .then(toppings => toppings.forEach(topping => {
        let li = h('li');
        li.classList.add("list-group-item");
        li.style.cursor = 'pointer';
        li.innerHTML = topping;
        toppingsUl.appendChild(li);
    }));


// Ouverture pizzeria, début des commandes
pizzeriaService.open(pizza => {
    // ajoute pizza à la liste
    let li = h('li');
    li.classList.add("list-group-item");
    li.style.cursor = 'pointer';
    li.setAttribute('data-pizza', pizza.id);
    li.innerHTML = `${pizza.recipe} <span class="badge">${ pizza.toppings.length }</span>`;
    commandesUl.appendChild(li);
});



//quand click sur commande, affiche la pizza dans partie pizza
commandesUl.addEventListener('click', (event) => {
    pizzaToppingsUl.innerHTML = "";
    if (event.target.classList[1] !== "wrong") {
        if (event.target.classList !== "list-group-item wrong") {
            if (event.target && event.target.nodeName === "LI") {
                let pizza = pizzasService.getPizza(event.target.getAttribute("data-pizza"))
                    .then(pizza => selectPizza(pizza));
            }
        }
    } else h2Pizza.innerText = "Sélectionner une pizza valide";
})


//quand click sur un ingrédient, ajoute à la liste des ingrédients

toppingsUl.addEventListener('click', (event) => {
    if (!currentPizza) return;
    if (event.target && event.target.nodeName === "LI") {
        let li = h('li');
        li.classList.add("list-group-item");
        li.innerHTML = event.target.innerText;
        pizzaToppingsUl.appendChild(li);
        currentPizza.toppings.push(event.target.innerText);
        pizzasService.updatePizza(currentPizza);
    }

    recipeService.findRecipe(currentPizza.recipe).then(recipe => getStatus(currentPizza, recipe))
        .then(status => {
            if (status === "Complete") {
                console.log("Complete");
                removePizza();
            } else if (status === "In progress") {
                console.log("In progress");
                updateBadge();
            } else if (status === "Wrong") {
                console.log("Wrong");
                wrongPizza();
                currentPizza = null;
                selectPizza(currentPizza);
            }
        });

})


function getStatus(pizza, recipe) {
    let res = recipe.toppings.reduce((acc, topping) => {
        let first = pizza.toppings.indexOf(topping);
        let last = pizza.toppings.lastIndexOf(topping);
        if (first !== -1 && first === last) acc.ok++;
        else acc.ko++;
        return acc;
    }, { ok: 0, ko: 0 });

    if (res.ok < pizza.toppings.length) return "Wrong";
    else if (res.ko > 0) return 'In progress';
    else return "Complete";
};


function removePizza() {
    commandesUl.querySelector(`[data-pizza="${currentPizza.id}"]`).remove();
}

function updateBadge() {
    let badges = commandesUl.querySelector(`[data-pizza="${currentPizza.id}"]`).getElementsByClassName("badge");
    Array.from(badges).forEach(badge => badge.innerHTML = currentPizza.toppings.length);
}

function wrongPizza() {
    commandesUl.querySelector(`[data-pizza="${currentPizza.id}"]`).classList.add("wrong");
}