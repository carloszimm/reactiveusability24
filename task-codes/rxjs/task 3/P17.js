let { from, timer } = require('rxjs');
let { mergeMap } = require('rxjs/operators');

const getProduct = async (product_id) => {
  return await fetch(`https://dummyjson.com/products/${product_id}`)
    .then(response => response.json())
    .catch(err => {
        return {
            error: err.message,
            product_id: product_id,
        }
    });
};

const fetchDataObservable = timer(0, 10000).pipe(
    mergeMap(() => from(getProduct(randomInt(1,100))))
);

fetchDataObservable.subscribe({
    next(product) {
        console.log(JSON.stringify(product, null, 2));
        console.log();
    },
    error(err) {
        console.error('something wrong occurred: ' + err);
    },
    complete() {
        console.log('done');
    }
});

function randomInt(low, high) {
    return Math.floor(Math.random()* (high-low) +low);
}