const https = require('https');

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
  setInterval(() => {
    const productId = getRandomProductId();
    fetchRandomProduct(productId)
      .then((productData) => {
        console.log(`Dados do produto ID ${productId}:`, productData);
      })
      .catch((error) => {
        console.error(`${productId}:`, error.message);
      });
  }, 10000);
};

fetchRandomProductsStream();

// Tempo gasto de 35 minutos