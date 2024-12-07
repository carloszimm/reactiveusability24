Bacon = require("baconjs");

function getRandomProductId() {
    return Math.floor(Math.random() * 100) + 1;
}

productStream = Bacon.interval(10000)
    .map(() => getRandomProductId())
    .flatMapLatest(productId =>
        Bacon.fromPromise(
            fetch(`https://dummyjson.com/products/${productId}`)
                .then(response => response.json())
        )
    )
    .takeUntil(Bacon.later(15000, '')); // Questão 4

productStream.onValue(function (product) {
    console.log(product);
});