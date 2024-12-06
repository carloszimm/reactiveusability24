const axios = require('axios');
const { fromPromise, repeat, once, retry, Error, fromArray, fromPoll, later, Next, mergeAll } = require('baconjs');

repeat(i => (i < 10) ? once(i + 401) : false)
        .bufferingThrottle(3000)
        .flatMap(code => retry({
            source: (_) => fromPromise(axios.get(`https://httpbin.org/status/${code}`))
                .map(result => result.data)
                .flatMapError((_) => new Error(`Ocorreu um erro ao requisitar o URL https://httpbin.org/status/${code} (número de tentativas: 3)`)),
            retries: 3,
        }))
        .onError(console.error);