const { Subject, from, interval } = require('rxjs');
const { switchMap, takeUntil } = require('rxjs/operators');

const subject_request = new Subject()

subject_request.subscribe({
  next: (v) => console.log(v)
})

const seconds = interval(10000)
  .pipe(
    switchMap(() => from(fetch(`https://dummyjson.com/products/${Math.floor(Math.random() * 100) + 1}`)
      .then((response => {
        return response.json()
      }))
    )),
    takeUntil(subject_request)
  )
  .subscribe(subject_request)

setTimeout(() => {
  subject_request.complete()
}, 15000)
