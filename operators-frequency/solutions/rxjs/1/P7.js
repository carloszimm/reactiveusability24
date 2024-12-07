const { interval, concatMap, take } = require('rxjs');
const axios = require('axios');

interval(3000).pipe(take(10))//dispara a cada 3s
  .pipe(
    concatMap(id => axios.get(`https://jsonplaceholder.typicode.com/users/${id+1}`))
  )
  .subscribe(user => console.log(user.data));