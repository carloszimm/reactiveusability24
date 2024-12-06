const fetch = require('node-fetch');
const {
  fromPromise,
  fromArray,
  sequentially,
  retry,
  Error,
  fromPoll,
  End,
} = require('baconjs');

const generateRandomId = () => Math.floor(Math.random() * 100) + 1

fromPoll(10000, generateRandomId)
  .map(randomId => `https://dummyjson.com/products/${randomId}`)
  .flatMap(url => fromPromise(
    fetch(url)
      .then(response => response.json())
  )
  )
  .onValue(console.log)