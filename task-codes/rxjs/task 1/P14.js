const axios = require("axios");
const { interval, take } = require("rxjs");

const request = (x) =>
  axios
    .get(`https://jsonplaceholder.typicode.com/users/${x}`)
    .then((response) => console.log(response.data));

const observable = interval(3000);
const tenTimes = observable.pipe(take(10));

tenTimes.subscribe((x) => request(x + 1));