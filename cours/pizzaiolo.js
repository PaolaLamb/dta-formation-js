//recipe
// ajouter une recette
let recipes = [{
        "id": 1,
        "name": "Regina",
        "toppings": [
            "Jambon",
            "Fromage",
            "Champignon"
        ]
    },
    {
        "id": 2,
        "name": "3 fromages",
        "toppings": [
            "Mozzarella",
            "Chèvre",
            "Bleu"
        ]
    }
];

function addRecipe(recipe) {
    recipes.push({
        name: recipe.name,
        toppings: recipe.toppings
    });
}

fetch("http://10.1.0.136:3000/recipes")
    .then(response => response.json())
    .then(recipes => recipes.forEach(addRecipe))



// Pizzas
let p1 = {
    recipe: 'Regina',
    toppings: ['jambon', 'champignon', 'fromage']
};

let p2 = {
    recipe: 'Regina',
    toppings: ['jambon', 'fromage']
};

let p3 = {
    recipe: '3 fromages',
    toppings: ['mozzarella', 'bleu', 'chèvre']
};

let p4 = {
    recipe: "3 fromages",
    toppings: ['mozzarella', 'bleu', 'chèvre', 'TrucEnPlusPasBonDuTout']
};

let pizzaPool = [p1, p2, p3, p4];


// Tools
// trouver une recette en fonction de son nom
findRecipe = function(recipeName) {
    return recipes.find(recipe => recipe.name === recipeName);
}

// donne statut d'une pizza : wrong, in progress, complete
function getStatus(pizza) {
    let recipe = findRecipe(pizza.recipe);

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


//retourne la globalité des statuts des pizzas
function actualStatus(pizzas, status) {
    let acc = pizzas.reduce((acc, pizza) => {
        let status = getStatus(pizza);
        if (status === "Complete") acc.complete++;
        else if (status === "In progress") acc.incomplete++;
        else if (status === "Wrong") acc.wrong++;
        return acc;
    }, { incomplete: 0, complete: 0, wrong: 0 })

    if (status === "Complete") return acc.complete;
    else if (status === "In progress") return acc.incomplete;
    else if (status === "Wrong") return acc.wrong;
    else return acc;
};


// creation de la liste des recettes déjà présentes pour html
let ul = document.createElement("ul");
ul.classList.add("recipes");
let divs = document.getElementsByClassName("container");
Array.from(divs).forEach(div => div.appendChild(ul));

recipes.forEach(recipe => {
    let li = document.createElement("li");
    li.innerHTML = recipe.name;
    ul.appendChild(li);
})


// creation du bouton/input pour ajouer une recette à la liste
let button = document.querySelector(".btn");
let input = document.querySelector(".form-control");



// creation de l'event click du bouton pour ajouter une recette
button.addEventListener('click', () => {
    let uls = document.body.getElementsByClassName("recipes");
    let newRecipe = input.value;

    recipes.push({
        name: newRecipe,
        toppings: []
    });


    let li = document.createElement("li");
    li.innerHTML = newRecipe;
    Array.from(uls).forEach(ul => ul.appendChild(li));

}, false);