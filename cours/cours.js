let tab = [10, 20, 30];
let moyenne = tab.reduce((acc, item, idx, arr) => acc + item / arr.length, 0);
console.log(moyenne);

let extraFind = function(arr, cb) {
    return arr.reduce((acc, value, index) => (arr || (cb(value)) ? { value, index } : undefined), undefined);
}

let sup = extraFind(tab, x => x > 10);
console.log(sup);

let _map = function(arr, cb) {
    return arr.reduce((acc, item) => [...acc, cb(item)], []);
}
console.log(_map(tab, x => x / 2));