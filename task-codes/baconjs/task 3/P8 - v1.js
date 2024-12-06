const axios = require('axios');
const { fromPromise, repeat, once, retry, Error, fromArray, fromPoll, later, Next, mergeAll } = require('baconjs');

const ids = Array.from({ length: 100 }, (_, i) => i + 1).sort(() => Math.random() - 0.5);

fromArray(ids)
    .bufferingThrottle(10000)
    .flatMap(id => fromPromise(axios.get(`https://dummyjson.com/products/${id}`)))
    .map(result => result.data)
    .onValue(val => console.log(val));