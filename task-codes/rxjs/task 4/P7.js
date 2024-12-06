const {interval, concatMap, take, map, distinct, timeout} = require('rxjs');
const axios = require('axios');

interval(1000).pipe(take(15))//dispara 
  .pipe(
    map(() => Math.floor(Math.random() * 100) + 1),
    distinct(),
    concatMap(x =>  axios.get(`https://dummyjson.com/products/${x}`)),
    timeout(5000)
  )
  .subscribe(x => console.log(x.data));