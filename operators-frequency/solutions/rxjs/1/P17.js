let { from, interval } = require('rxjs');
let { mergeMap, take } = require('rxjs/operators');

const getUserData = async (id) => {
  return await fetch(`https://jsonplaceholder.typicode.com/users/${id}`).then(response => response.json());
};

const intervalObservable = interval(3000).pipe(take(10));

const fetchDataObservable = intervalObservable.pipe(
    mergeMap((id) => from(getUserData(id+1)))
);

fetchDataObservable.subscribe(userData => console.log(JSON.stringify(userData, null, 2)));