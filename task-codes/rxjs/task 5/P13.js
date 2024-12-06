// 20:15 - 20:43

const { interval, take, map, concatAll, windowTime, mergeAll, windowCount, reduce, bufferCount, share } = require('rxjs');

const ids = interval(10000);

function getRandomInt(min, max) {
    return min + Math.floor(Math.random() * (max - min));
}

const getProducts = ids.pipe(
    map(id => getRandomInt(1, 100)),
    map((id) => fetch(`https://dummyjson.com/products/${id}`)
        .then(res => res.json())
        .catch(e => console.log(e))
    ),
    concatAll(),
    share()
);
const getMovingAvarage1 = getProducts.pipe(
    map(produto => produto.price),
    bufferCount(3, 1),
    map(arr => (arr[0] + arr[1] + arr[2]) / 3)
)

getProducts.subscribe(x => console.log(x));

getMovingAvarage1.subscribe(x => console.log('Média de preço dos últimos 3 produtos:', x))