Bacon = require("baconjs")

Bacon.sequentially(3000, [1,2,3,4,5,6,7,8,9,10])
    .flatMapLatest(id =>
        Bacon.fromPromise(
            fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
                .then(response => response.json())
        )
    ).onValue(function (val) {
        console.log(val);
    })