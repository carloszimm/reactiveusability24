let { from, interval } = require('rxjs');
let { mergeMap, take } = require('rxjs/operators');

const getData = async (status_code) => {
  return await fetch(
        `https://httpbin.org/status/${status_code}`,
        {retries: 3, retryDelay: 1000}
    )
    .then(response => response.json())
    .catch(err => {
        return {
            error: err.message,
            status: status_code,
            message: `Ocorreu um erro ao requisitar a URL "https://httpbin.org/status/${status_code}" (número de tentativas: 3)`
        }
    });
};

const intervalObservable = interval(3000).pipe(take(10));

const fetchDataObservable = intervalObservable.pipe(
    mergeMap((status_code) => from(getData(status_code+401)))
);

fetchDataObservable.subscribe({
    next(data) {
        console.log(JSON.stringify(data, null, 2));
        console.log();
    },
    error(err) {
        console.error('something wrong occurred: ' + err);
    },
    complete() {
        console.log('done');
    }
});