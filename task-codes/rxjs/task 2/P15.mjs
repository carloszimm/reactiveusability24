const { from, interval } = require('rxjs');
const { concatMap, take, catchError } = require('rxjs/operators');

const array = [401, 402, 403, 404, 405, 406, 407, 408, 409, 410]; 
const result = from(array);

result
  .pipe(
    concatMap(x => {
      return interval(3000).pipe(
        take(3),
        concatMap(() =>
          from(fetch("https://httpbin.org/status/" + x).then(response => {
            if (!response.ok) {
              throw new Error(`Ocorreu um erro ao requisitar o URL https://httpbin.org/status/${x}`);
            }
            return response.json();
          }))
        ),
        catchError(error => {
          console.error(error);
          return [];
        })
      );
    })
  )
  .subscribe(x => console.log(x));