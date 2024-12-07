const https = require('https');
const { interval } = require('rxjs');
const { takeUntil } = require('rxjs/operators');

const getRandomProductId = () => Math.floor(Math.random() * 100) + 1;

const fetchRandomProduct = (productId) => {
  return new Promise((resolve, reject) => {
    https.get(`https://dummyjson.com/products/${productId}`, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        resolve(JSON.parse(data));
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
};

const fetchRandomProductsStream = () => {
  const timer$ = interval(10000).pipe(
    takeUntil(interval(15000)) // Até 15 segundos
  );

  timer$.subscribe(() => {
    const productId = getRandomProductId();
    fetchRandomProduct(productId)
      .then((productData) => {
        console.log(`Dados do produto ID ${productId}:`, productData);
      })
      .catch((error) => {
        console.error(`Erro ao obter dados do produto ID ${productId}:`, error.message);
      });
  });
};

fetchRandomProductsStream();