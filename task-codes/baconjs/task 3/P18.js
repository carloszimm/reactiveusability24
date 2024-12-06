Bacon = require("baconjs")

function getRandomProductId() {
    return Math.floor(Math.random() * 100) + 1;
}

Bacon.interval(10000)
    .map(() => getRandomProductId())
    .flatMapLatest(productId =>
        Bacon.fromPromise(
            fetch(`https://dummyjson.com/products/${productId}`)
                .then(response => response.json())
        )
    ).onValue(function (val) {
        console.log(val);
    })