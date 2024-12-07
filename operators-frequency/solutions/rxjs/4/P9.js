const { Observable } = require('rxjs');
const { concatMap, map, publish, takeUntil } = require('rxjs/operators');
const axios = require('axios');

const getRandomId = () => Math.floor(Math.random() * 100) + 1;

const ids$ = Observable.interval(10000).pipe(
  map(getRandomId),
  publish()
);

ids$.subscribe(console.log);

const maxTime$ = Observable.timer(15000);

ids$.pipe(
  concatMap(id => axios.get(`https://dummyjson.com/products/${id}`)),
  takeUntil(maxTime$)
).subscribe(response => console.log(response.data));
