const { Subject, from, interval } = require('rxjs');
const { switchMap, takeUntil } = require('rxjs/operators');

const subject_request = new Subject()

let index = 1
let priceMean = 0

subject_request.subscribe({
  next: (v) => {
    console.log(v)
    priceMean = priceMean + v.price
    if (index === 3) {
      console.log(`Média do preço dos últimos 3 produtos: ${(priceMean / 3).toFixed(2)}`)
      index = 1
      priceMean = 0
    }
    index++
  }
})

const seconds = interval(10000)
  .pipe(
    switchMap(() => from(fetch(`https://dummyjson.com/products/${Math.floor(Math.random() * 100) + 1}`)
      .then((response => {
        return response.json()
      }))
    ))
  )
  .subscribe(subject_request)
