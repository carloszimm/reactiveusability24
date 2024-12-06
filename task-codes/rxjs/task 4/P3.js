const { switchMap, range, Observable, delay, concatMap, of, map, takeWhile, EMPTY } = require('rxjs');

range(1, 100).pipe(
    concatMap(x => of(x).pipe(delay(1000))),
    takeWhile(x => x < 15),
    concatMap(item => of(item).pipe(
        switchMap(item => {
            if (item % 10 == 0) {
                return fetch("https://dummyjson.com/products/" + Math.floor(Math.random() * 100 + 1)).then(response => response.json())
            }
            return EMPTY
        })
    )
    )
).subscribe(x => {
    console.log(x)
});