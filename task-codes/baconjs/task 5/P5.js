const fetch = require('node-fetch');
const Bacon = require('../node_modules/baconjs/dist/Bacon.mjs');

let delay = 3000

const lastThreeProductsPrices = []
let currIndex = 0

Bacon.fromPoll(delay, () => {
  const productId = Math.floor(Math.random() * 100) + 1

  return new Bacon.Next(Bacon.fromPromise(
    fetch(`https://dummyjson.com/products/${productId}`)
      .then(response => response.json())
      .then(json => {
        if (lastThreeProductsPrices.length < 3)
          lastThreeProductsPrices.push(json.price)
        else
          lastThreeProductsPrices[currIndex] = json.price

        currIndex = (currIndex + 1)%3

        let sum = lastThreeProductsPrices.reduce((partialSum, x) => partialSum + x, 0)
        
        console.log(`Média de preço dos últimos 3 produtos: ${sum/lastThreeProductsPrices.length}.`)
      })
  ))
}).subscribe()