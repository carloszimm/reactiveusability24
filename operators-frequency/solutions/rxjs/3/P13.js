// terminei de 19:35
const { interval, take, map, concatAll } = require('rxjs');

const ids = interval(10000);

function getRandomInt(min, max) {
    return min + Math.floor(Math.random() * (max - min));
}

const getProducts = ids.pipe(
    take(10),
    map(id => getRandomInt(1, 100)),
    map((id) => fetch(`https://dummyjson.com/products/${id}`)
        .then(res => res.json())
        .catch(e => console.log(e))
    ),
    concatAll()
);

getProducts.subscribe(x => console.log(x));