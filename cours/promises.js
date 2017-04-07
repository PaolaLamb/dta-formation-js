fetch('https://jsonplaceholder.typicode.com/photos')
    .then(r => r.json())
    .then(photos => photos.map(p => p.title))
    .then(names => console.log(names))




setTimeout(doItLater, 2000);
promiseTimeout(1000).then(doItLater);

function promiseTimeout(time) {
    return new Promise(resolve => setTimeout(resolve, time));
};

function doItLater() {
    console.log('Youpi !');
};