const axios = require("axios");
const { interval, fromEvent, delay } = require("rxjs");

const int = interval(10000);
const getId = () => Math.floor(Math.random() * (100 - 1 + 1));
const request = (product_id) =>
  axios
    .get(`https://dummyjson.com/products/${product_id}`)
    .then((response) => console.log(response.data));

const intSub = int.subscribe({
  next: (x) => request(getId()),
  error: (x) => console.error(x)
});

const clicks = fromEvent(document, "click");
const delayedClicks = clicks.pipe(delay(1500));

const clickSub = delayedClicks.subscribe((x) => console.log(x));

clickSub.add(intSub);
