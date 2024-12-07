const { range, delay, concatMap, of, map } = require('rxjs');

range(1, 100).pipe(
    concatMap(x => of(x).pipe(delay(9000))),
    map(item => Math.floor(Math.random() * 100) + 1),
    concatMap(item => of(item).pipe(
        map(item => fetch("https://dummyjson.com/products/" + item).then(response => response.json())),
        delay(1000)//tempo para a promise retornar
    )
    )
).subscribe(x => {
    console.log(x)
});