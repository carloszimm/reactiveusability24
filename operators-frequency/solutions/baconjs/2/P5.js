const fetch = require('node-fetch');
const Bacon = require('baconjs');

let delay = 3000

const getUrlResource = (status) => {
  return `https://httpbin.org/status/${status}`
}

Bacon.repeat((status) => {
  status += 401
  if (status <= 410)
    return Bacon.retry({
      source: (attemptNumber) => {
        if (attemptNumber > 0)
          console.error(`Ocorreu um erro ao requisitar o URL ${getUrlResource(status)} (número de tentativas: ${attemptNumber})`)
        return Bacon.fromPromise(
          fetch(getUrlResource(status))
            .then(response => response.json())
        )
      },
      retries: 3,
      delay: (context) => { return delay }
    })
  else
    return false
}).log()