const { range, delay, concatMap, of, map } = require('rxjs');

let fstPrice = 0
let secPrice = 0
let trdPrice = 0

range(1, 100).pipe(
    concatMap(x => of(x).pipe(delay(9000))),
    concatMap(item => of(item).pipe(
        map(item => fetch("https://dummyjson.com/products/" + (Math.floor(Math.random() * 100) + 1))
        .then(response => response.json())
        .then(res => [res, res['price']])
        .then(res => [res[0], "Média de preço dos últimos 3 produtos: " + switchProd(res[1])])),
        delay(1000) //tempo para a promise retornar
    )
    )
).subscribe(x => {
    console.log(x)
})

function switchProd(price){
    trdPrice = secPrice
    secPrice = fstPrice
    fstPrice = price
    return (trdPrice + secPrice + fstPrice)/3
}