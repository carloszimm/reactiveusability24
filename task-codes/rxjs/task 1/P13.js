// 65 minutos
const { interval, take, map, concatAll } = require('rxjs');

const ids = interval(3000);

const getPeople = ids.pipe(
    take(10),
    map(id => id + 1),
    map((id) => fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(res => res.json())
        .catch(e => console.log(e))
    ),
    concatAll()
);

getPeople.subscribe(x => console.log(x));