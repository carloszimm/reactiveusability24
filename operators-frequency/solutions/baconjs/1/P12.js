const Bacon = require('baconjs');

const fetchByIdStream = async (id) => {
  return await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
};

let id = 0;

Bacon
  .interval(3000)
  .take(10)
  .flatMap(() => Bacon.fromPromise(fetchByIdStream(++id)))
  .flatMap((response) => Bacon.fromPromise(response.json()))
  .log();
