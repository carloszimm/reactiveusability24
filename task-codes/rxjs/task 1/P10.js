import {
  of,
  from,
  interval,
  take,
  map,
  mergeMap,
  switchMap,
  tap,
  skip,
  range,
  filter,
  toArray,
  delay,
  retry,
  catchError,
  pipe,
  EMPTY,
  scan,
  Subject,
} = require('rxjs');

interval(3000)
  .pipe(
    map((x) => x + 1), // Para começar do 1, ao invés do 0
    map(String),
    mergeMap((id) =>
      fetch(`https://jsonplaceholder.typicode.com/users/${id}`).then(
        (response) => response.json()
      )
    ),
    take(10)
  )
  .subscribe({
    next: (result) => console.log(result),
    error: (err) => console.error(err),
    complete: () => console.log('Todos os dados foram resgatados!'),
  });
