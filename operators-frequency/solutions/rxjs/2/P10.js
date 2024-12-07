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

interval(3000)
  .pipe(
    map((x) => x + 401), // Para começar do 401, ao invés do 0
    map(String),
    switchMap((status, index) =>
      from(
        fetch(`https://httpbin.org/status/${status}`).then((response) =>
          response.text().then((res) => {
            if (!res.length)
              throw new Error(
                `Ocorreu um erro ao requisitar o URL https://httpbin.org/status/${status}`
              );

            return res;
          })
        )
      ).pipe(
        retry(3),
        catchError((err) => of(err))
      )
    ),
    map((response) => {
      if (response instanceof Error) {
        console.error(response);
      } else {
        console.log(response);
      }
    }),
    take(10)
  )
  .subscribe();
