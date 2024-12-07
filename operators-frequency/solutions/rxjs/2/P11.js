const {
  from,
  take,
  concatMap,
  interval,
  skip,
  retry,
  onErrorResumeNext,
} = require('rxjs');

const subscription = interval(3000).pipe(
  take(11),
  skip(1),
  concatMap((status_code) =>
    from(
      fetch(`https://httpbin.org/status/${status_code + 400}`)
        .then((response) => {
          if (response.ok) {
            response.json();
          } else {
            throw response.url;
          }
        })
        .catch((e) =>
          console.error(
            `Ocorreu um erro ao requisitar o URL https://httpbin.org/status/${status_code + 400
            } (número de tentativas: 3) `
          )
        )
    )
  ),
  retry(3)
);

onErrorResumeNext(subscription).subscribe();
