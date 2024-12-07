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

const statuses = [401, 402, 403, 404, 405, 406, 407, 408, 409, 410]

sequentially(3000, statuses)
  .map(statusCode => `https://httpbin.org/status/${statusCode}`)
  .flatMapConcat(url => retry({
    source: (attemptNumber => fromPromise(
      fetch(url)
        .then(response => response.json())
    )
      .flatMapError(error => new Error({ url, numberOfAttempts: attemptNumber, error }))
    ),
    retries: 3
  }))
  .onError(error => console.log(`Ocorreu um erro ao requisitar o URL ${error.url} (número de tentativas: ${error.numberOfAttempts})`))