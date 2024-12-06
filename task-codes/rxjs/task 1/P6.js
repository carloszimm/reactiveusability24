// Tempo 49m02s

const { from, interval, take, skip } = require('rxjs');
const fetch = require("node-fetch");

const numbers = interval(3000);

const takeTenIds = numbers.pipe(skip(1), take(10));

takeTenIds.subscribe(i => {
    var userUrl = 'https://jsonplaceholder.typicode.com/users/' + i;
    from(
        fetch(userUrl).then(response => response.json())
    ).subscribe(user => console.log(user))
});
