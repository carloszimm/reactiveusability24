const https = require('https');
const { interval } = require('rxjs');
const { takeUntil, scan, map } = require('rxjs/operators');

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
    takeUntil(interval(15000)),
    scan((acc) => {
      const productId = getRandomProductId();
      fetchRandomProduct(productId)
        .then((productData) => {
          const price = productData.price || 0;
          acc.push(price);

          if (acc.length > 3) {
            acc.shift(); 
          }

          const averagePrice = acc.reduce((total, current) => total + current, 0) / acc.length;
          console.log(`Dados do produto ID ${productId}:`, productData);
          console.log(`Média de preço dos últimos 3 produtos: ${averagePrice.toFixed(2)}`);
        })
        .catch((error) => {
          console.error(`Erro ao obter dados do produto ID ${productId}:`, error.message);
        });

      return acc;
    }, []),
    map((acc) => acc.slice(-3)) 
  );

  timer$.subscribe();
};

fetchRandomProductsStream();