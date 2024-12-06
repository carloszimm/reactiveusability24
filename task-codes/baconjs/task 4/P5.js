const fetch = require('node-fetch');
const Bacon = require('../node_modules/baconjs/dist/Bacon.mjs');

const delay = 10000
const delayUntilUserInteraction = 15000

let userInactivity = Bacon.later(delayUntilUserInteraction, ()  => true)

let hasUserInteracted = false

userInactivity.onEnd(() => hasUserInteracted = true)

Bacon.fromPoll(delay, () => {
  const productId = Math.floor(Math.random() * 100) + 1

  if (hasUserInteracted)
    return new Bacon.End()
  
  return new Bacon.Next(Bacon.fromPromise(
    fetch(`https://dummyjson.com/products/${productId}`)
      .then(response => response.json())
      .then(json => console.log(json))
  ))
}).subscribe()
