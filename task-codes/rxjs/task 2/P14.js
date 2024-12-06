const axios = require("axios");
const { interval, retry, take } = require("rxjs");

const intervalBetween = interval(3000);

const request = (status) =>
  axios
    .get(`https://httpbin.org/status/${status}`)
    .then((response) => console.log(response.data));

intervalBetween.pipe(take(10), retry(3)).subscribe({
  next: (x) => request(x + 401),
  error: (x) => console.error(x)
});
