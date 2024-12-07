const { from, interval } = require('rxjs');
const { concatMap } = require('rxjs/operators');

const idProduto = () => Math.floor(Math.random() * 100) + 1; 

interval(10000) 
  .pipe(
    concatMap(() => {
      const produto = idProduto();
      const url = `https://dummyjson.com/products/${produto}`;

      return from(fetch(url).then(response => {return response.json();}));
    })
  )
  .subscribe(product => console.log(product));