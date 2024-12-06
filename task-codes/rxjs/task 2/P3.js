const { Observable, from, delay, concatMap, of, map, catchError, onErrorResumeNext } = require('rxjs');

const myArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
onErrorResumeNext(
    from(myArray).pipe(
        concatMap(item => of(item).pipe(
            map(item => getUrl(item)),
            delay(3000)
        )
        )
    )).subscribe(x => {
        console.log(x)
    });



function getUrl(item) {
    return new Observable(fetch("https://httpbin.org/status/" + (item + 400)))
        .pipe(
            delay(3000),
            map(response => response.json()),
            catchError(error => of([]))
        )
}