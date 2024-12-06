const { from, take, concatMap, interval, skip } = require('rxjs');

const subscription = interval(3000)
  .pipe(
    take(11),
    skip(1),
    concatMap((id) =>
      from(
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`).then(
          (response) => response.json()
        )
      )
    )
  )
  .subscribe(console.log);
