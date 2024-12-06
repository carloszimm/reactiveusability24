const { from, interval } = require( 'rxjs');
const { switchMap } = require( 'rxjs/operators');

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const seconds = interval(3000)
  .pipe(
    switchMap((index) => from(fetch(`https://jsonplaceholder.typicode.com/users/${array[index]}`)
      .then((response => {
        return response.json()
      }))
      .finally(() => {
        if (array.length === index) {
          seconds.unsubscribe()
        }
      })
    )))
  .subscribe(console.log)
