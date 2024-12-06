// terminei de 19:35
const { interval, take, map, concatAll, windowTime, mergeAll } = require('rxjs');

const ids = interval(10000);

function getRandomInt(min, max) {
    return min + Math.floor(Math.random() * (max - min));
}

const getProducts = ids.pipe(
    windowTime(15000),
    take(2), // o primeiro é emitido imediatamente, vazio
    mergeAll(),
    map(id => getRandomInt(1, 100)),
    map((id) => fetch(`https://dummyjson.com/products/${id}`)
        .then(res => res.json())
        .catch(e => console.log(e))
    ),
    concatAll()
);

getProducts.subscribe(x => console.log(x));