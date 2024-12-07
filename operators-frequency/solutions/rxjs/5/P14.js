const axios = require("axios");
const { interval } = require("rxjs");

const int = interval(10000);
const getId = () => Math.floor(Math.random() * (100 - 1 + 1));

const lastThreeProducts = [0, 0, 0];

const request = (product_id) =>
  axios.get(`https://dummyjson.com/products/${product_id}`).then((response) => {
    lastThreeProducts.push(response.data.price);

    const average =
      (lastThreeProducts[lastThreeProducts.length - 1] +
        lastThreeProducts[lastThreeProducts.length - 2] +
        lastThreeProducts[lastThreeProducts.length - 3]) /
      3;

    console.log(response.data);
    console.log(`Média de preço dos últimos 3 produtos: ${average}`);
  });

int.subscribe({
  next: (x) => request(getId()),
  error: (x) => console.log(x)
});
