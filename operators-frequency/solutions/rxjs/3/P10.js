const {
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

interval(10000)
  .pipe(
    map(() => Math.floor(100 * Math.random()) + 1),
    map(String),
    mergeMap((id) =>
      fetch(`https://dummyjson.com/products/${id}`).then((response) =>
        response.json()
      )
    )
  )
  .subscribe({ next: (result) => console.log(result) });
