const { from, delay, concatMap, of, map } = require('rxjs');

from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).pipe(
  concatMap(x => of(x).pipe(delay(3000))),
  concatMap(item => of(item).pipe(
    map(item => fetch("https://jsonplaceholder.typicode.com/users/" + item).then(response => response.json()))
  )
  ),
  delay(1000)//tempo para a promise retornar
).subscribe(x => {
  console.log(x)
});