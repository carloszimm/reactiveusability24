const axios = require('axios');
const { fromPromise, repeat, once, retry, Error, fromArray, fromPoll, later, Next, mergeAll } = require('baconjs');

repeat(i => (i < 10) ? once(i + 1) : false)
        .bufferingThrottle(3000)
        .flatMap(id => fromPromise(axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)))
        .map(result => result.data)
        .onValue(val => console.log(val));