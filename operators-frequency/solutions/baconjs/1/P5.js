const fetch = require('node-fetch')
const Bacon = require('../node_modules/baconjs/dist/Bacon.mjs');

let delay = 3000

Bacon.repeat((id) => {
  id += 1
  if (id <= 10)
    return Bacon.fromPromise(
      fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(response => response.json())
    ).delay(delay)
  else
    return false
}).log()