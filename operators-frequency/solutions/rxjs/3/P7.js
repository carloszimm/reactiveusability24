const { interval, concatMap, map, distinct, timeout} = require('rxjs');
const axios = require('axios');

interval(10000)//dispara a cada 10s
  .pipe(
    map(() => Math.floor(Math.random() * 100) + 1),
    //distinct(),//Acho que seria mais interessante que os produtos não se repetissem, porém pra que a stream seja emitida por tempo indefinido será necessário que os produtos se repitam
    concatMap(x =>  axios.get(`https://dummyjson.com/products/${x}`)),
    timeout(30000)
  )
  .subscribe(x => console.log(x.data));