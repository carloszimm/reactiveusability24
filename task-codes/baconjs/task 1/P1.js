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

const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

sequentially(3000, ids)
  .flatMapConcat(id => fromPromise(
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(response => response.json())
  ))
  .onValue(console.log)