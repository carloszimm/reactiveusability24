// 36 minutos
const { interval, take, map, concatAll, retry } = require('rxjs');

const statuses = interval(3000);

const getStatuses = statuses.pipe(
    take(10),
    map(status => status + 401),
    map((status) => fetch(`https://httpbin.org/status/${status}`)
        .then(res => res.json())
        .catch(e => {
            console.log('errei', status)
            throw e
        })
    ),
    concatAll(),
    retry(3)
);

getStatuses.subscribe({
    next: x => console.log(x),
    error: err => console.error(`Ocorreu um erro ao requisitar o URL ${err.message} (número de
        tentativas: 3)`)
});