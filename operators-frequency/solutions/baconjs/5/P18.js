Bacon = require("baconjs");

function getRandomProductId() {
    return Math.floor(Math.random() * 100) + 1;
}

let productPrices = [];

const productStream = Bacon.interval(10000)
    .map(() => getRandomProductId())
    .flatMapLatest(productId =>
        Bacon.fromPromise(
            fetch(`https://dummyjson.com/products/${productId}`)
                .then(response => response.json())
        )
    )
    .map(product => {
        productPrices.push(product.price);
        if (productPrices.length > 3) {
            productPrices.shift();
        } // Ele começa a printar a partir do terceiro produto, e aí ele fica shiftando o mais antigo
        return product; 
    }); 

productStream.onValue(function (product) {
    console.log(product);
    if (productPrices.length === 3) {
        const averagePrice = productPrices.reduce((a, b) => a + b, 0) / 3;
        console.log(`Média de preço dos últimos 3 produtos: ${averagePrice}`);
    }
});