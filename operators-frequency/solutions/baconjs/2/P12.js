const Bacon = require('baconjs');

const fetchByIdStream = async (id) => {
  return await fetch(`https://httpbin.org/status/${id}`)
};

let id = 401;

Bacon
  .interval(3000)
  .take(1)
  .flatMap(() => Bacon.retry({
    source: () => Bacon.fromPromise(fetchByIdStream(id)),
    retries: 3,
    delay: () => 100,
  }))
  .flatMap((response) => Bacon.fromPromise(response.json()))
  .log();
