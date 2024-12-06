const { from, interval } = require('rxjs');
const { concatMap, take } = require('rxjs/operators');

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; 
const result = from(array);

result
  .pipe(
    concatMap(x => {
      return interval(3000).pipe(
        take(1),
        concatMap(() =>
          from(fetch("https://jsonplaceholder.typicode.com/users/" + x).then(response => response.json()))
        )
      );
    })
  )
  .subscribe(x => console.log(x));