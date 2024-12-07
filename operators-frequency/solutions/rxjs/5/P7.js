const { interval, concatMap, map, distinct, timeout} = require('rxjs');
const axios = require('axios');
const Buffer = require('buffer');

let price1 =0;
let price2 = 0;
let price3 = 0;
let media = 0;

const observable  = interval(10000);//dispara a cada 10s
const result = observable.pipe(
    map(() => Math.floor(Math.random() * 100) + 1),
    // distinct(),//Acho que seria mais interessante que os produtos não se repetissem, porém pra que a stream seja emitida por tempo indefinido será necessário que os produtos se repitam
    concatMap(x =>  axios.get(`https://dummyjson.com/products/${x}`)),
    timeout(30000)
  );
  result.subscribe(
    x => map(() => 
    console.log(price2),//por algum motivo, sem essa linha price1 sempre será 0
    price1 = price2,
    price2 = price3,
    price3 = x.data.price,
    // console.log(price1, price2, price3),
    media = (price1+price2+price3)/3,
    console.log(`Média de preço dos últimos 3 produtos: ${media}`),
    console.log(x.data)),
    );