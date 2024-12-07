const { from, interval } = require('rxjs');
const { switchMap } = require('rxjs/operators');

const seconds = interval(10000)
  .pipe(
    switchMap(() => from(fetch(`https://dummyjson.com/products/${Math.floor(Math.random() * 100) + 1}`)
      .then((response => {
        return response.json()
      }))
      .finally(() => {
      })
    )))
  .subscribe(console.log)
