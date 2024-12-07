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

interval(1000)
  .pipe(
    map(() => Math.floor(100 * Math.random()) + 1),
    map(String),
    mergeMap((id) =>
      fetch(`https://dummyjson.com/products/${id}`).then((response) =>
        response.json()
      )
    ),
    scan(
      (acc, curr) => {
        let total = 0;

        if (acc.lastPrices.length >= 3) acc.lastPrices.shift();

        acc.lastPrices.push(curr.price);
        acc.lastPrices.forEach((price) => (total += price));

        console.log(curr);
        console.log('PREÇO MÉDIO: ', total / acc.lastPrices.length);

        return Object.assign(
          {},
          {
            total,
            acc,
            current: curr,
            lastPrices: acc.lastPrices,
          }
        );
      },
      { total: 0, lastPrices: [] }
    ),
    take(15)
  )
  .subscribe({
    next: (result) => {
      return result;
    },
  });
