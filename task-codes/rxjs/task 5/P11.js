const { from, concatMap, map, interval, take, tap, bufferCount } = require('rxjs');

const subscription = interval(1000).pipe(
  take(4),
  map(() => Math.ceil(Math.random() * 100)),
  concatMap((id) =>
    from(
      fetch(`https://dummyjson.com/products/${id}`).then((response) =>
        response.json()
      )
    )
  ),
  tap(console.log),
  map((x) => x.price),
  bufferCount(3, 1),
  map((x) =>
    x.length == 3 ? x.reduce((acc, one) => acc + one) / x.length : 0
  ),
  tap((x) => {
    if (x) {
      console.log(x);
    }
  })
);

subscription.subscribe();
