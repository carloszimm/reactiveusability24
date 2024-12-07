const Bacon = require('baconjs');

const generateRandomNumber = (min, max) => Math.floor(((max - min + 1) * Math.random()) + min);

const fetchProductById = async (id) => {
  return await fetch(`https://dummyjson.com/products/${id}`)
};

let id = 0;

Bacon
  .interval(10000)
  .take(10)
  .map(() => generateRandomNumber(1, 100))
  .flatMap(() => Bacon.fromPromise(fetchProductById(++id)))
  .flatMap((response) => Bacon.fromPromise(response.json()))
  .log();

