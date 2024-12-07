const fetch = require('node-fetch');
const Bacon = require('../node_modules/baconjs/dist/Bacon.mjs');

let delay = 10000


Bacon.fromPoll(delay, () => {
  const productId = Math.floor(Math.random() * 100) + 1

  return new Bacon.Next(Bacon.fromPromise(
    fetch(`https://dummyjson.com/products/${productId}`)
      .then(response => response.json())
      .then(json => console.log(json))
  ))
}).subscribe()