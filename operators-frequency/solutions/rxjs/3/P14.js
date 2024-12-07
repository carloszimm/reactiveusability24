const axios = require("axios");
const { interval } = require("rxjs");

const int = interval(10000);
const getId = () => Math.floor(Math.random() * (100 - 1 + 1));
const request = (product_id) =>
  axios
    .get(`https://dummyjson.com/products/${product_id}`)
    .then((response) => console.log(response.data));

int.subscribe({
  next: (x) => request(getId()),
  error: (x) => console.error(x)
});
