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

let totalElapsedSeconds = 0
const elapsedSecondsPast15Stream = fromPoll(1000, function () {
  totalElapsedSeconds += 1000
  return totalElapsedSeconds
})
  .skipWhile(elapsedSeconds => elapsedSeconds < 15000)

randomIdStream
  .takeUntil(elapsedSecondsPast15Stream)
  .map(randomId => `https://dummyjson.com/products/${randomId}`)
  .flatMap(url => fromPromise(
    fetch(url)
      .then(response => response.json())
  )
  )
  .onValue(console.log)