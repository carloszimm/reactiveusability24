const axios = require('axios');
const { fromPromise, repeat, once, retry, Error, fromArray, fromPoll, later, Next, mergeAll } = require('baconjs');

mergeAll([fromPoll(0, () => Math.floor(Math.random() * 100) + 1).take(1)
    , fromPoll(10000, () => Math.floor(Math.random() * 100) + 1)])
    .flatMap(id => fromPromise(axios.get(`https://dummyjson.com/products/${id}`)))
    .map(result => result.data)
    .doAction(console.log) //poderia utilizar log aqui também
    .map(data => data.price)
    .bufferWithCount(3)
    .onValue(val => console.log(`Média de preço dos últimos 3 produtos: ${val.reduce((acc, i) => acc + i) / 3}`));