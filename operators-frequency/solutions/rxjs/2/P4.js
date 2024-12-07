const { from, interval } = require('rxjs');
const { switchMap } = require('rxjs/operators');
const MAX_ATTEMPTS = 3

const array = [401, 402, 403, 404, 405, 406, 407, 408, 409, 410]
let index = 0
let attempts = 1
let error = false
const seconds = interval(3000)
  .pipe(
    switchMap(() => from(fetch(`https://httpbin.org/status/${array[index]}`)
      .then((response => {
        return response.json()
      }))
      .catch((err) => {
        console.log(`Ocorreu um error ao requisitar a URL https://httpbin.org/status ${attempts}`)
        error = true
      })
      .finally(() => {
        if (array.length === index) {
          seconds.unsubscribe()
        }

        if (error) {
          if (attempts === MAX_ATTEMPTS) {
            index++
            attempts = 0
          }
        } else {
          index++
          attempts = 0
        }
        attempts++
        error = false
      })
    )))
  .subscribe(console.log)
