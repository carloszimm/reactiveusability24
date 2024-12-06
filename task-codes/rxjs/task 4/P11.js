const {
  from,
  concatMap,
  map,
  interval,
  skip,
  take,
  timeout,
  catchError,
  takeUntil,
  timer,
} = require('rxjs');

const subscription = interval(10000).pipe(
  takeUntil(timer(15000)),
  map(() => Math.floor(Math.random() * 100)),
  concatMap((id) =>
    from(
      fetch(`https://dummyjson.com/products/${id}`).then((response) =>
        response.json()
      )
    )
  )
);

subscription.subscribe({
  next: console.log,
  error: console.error,
  complete: () => console.log('done'),
});
