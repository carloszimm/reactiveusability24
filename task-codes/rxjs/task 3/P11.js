const { from, take, concatMap, map, interval, skip } = require('rxjs');

interval(10000)
  .pipe(
    take(101),
    map(() => Math.floor(Math.random() * 100)),
    concatMap((id) =>
      from(
        fetch(`https://dummyjson.com/products/${id}`).then((response) =>
          response.json()
        )
      )
    )
  )
  .subscribe(console.log);
