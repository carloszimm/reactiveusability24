const { Observable } = require('rxjs');
const { concatMap, map, publish } = require('rxjs/operators');
const axios = require('axios');

const getRandomId = () => Math.floor(Math.random() * 100) + 1;

const ids$ = Observable.interval(10000).pipe(
  map(getRandomId),
  publish()
);

ids$.subscribe(console.log);

ids$.pipe(
  concatMap(id => axios.get(`https://dummyjson.com/products/${id}`))
).subscribe(response => console.log(response.data));