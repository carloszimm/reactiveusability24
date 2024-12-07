const fetch = require('node-fetch');
const {
  fromPromise,
  fromArray,
  sequentially,
  retry,
  Error,
  fromPoll,
  End,
} = require('baconjs');

const generateRandomId = () => Math.floor(Math.random() * 100) + 1
const randomIdStream = fromPoll(10000, generateRandomId)

randomIdStream
  .map(randomId => `https://dummyjson.com/products/${randomId}`)
  .flatMap(url => fromPromise(
    fetch(url)
      .then(response => response.json())
  )
  )
  .slidingWindow(3, 1)
  .map(latestProducts => {
    const accumulatedPrice = latestProducts.reduce(
      (accumulator, product) => accumulator + product.price,
      0
    )
    let meanPrice = accumulatedPrice / (latestProducts.length)

    return {
      meanPrice,
      lastProduct: latestProducts[latestProducts.length - 1]
    }
  })
  .onValue(obj => {
    console.log(`\n\nMédia de preço dos últimos 3 produtos: ${obj.meanPrice}`)
    console.log('Último produto:', obj.lastProduct)
  })