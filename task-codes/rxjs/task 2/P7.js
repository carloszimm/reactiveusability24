const { from, interval, concatMap, take, map, catchError, timeout,retry} = require('rxjs');
const axios = require('axios');

const status_codes = interval(3000).pipe(take(10));
const result = status_codes.pipe(map(x => x+401));
result
    .pipe(
        concatMap(x => axios.get(`https://httpbin.org/status/${x}`),
        timeout(5000),
        retry(2),// Tenta mais duas vezes
        catchError(error => {
            console.error(`Ocorreu um erro ao requisitar o URL [https://httpbin.org/status/${x}] (número de tentativas: 3) ${error.message}`);
            return from(result); 
            })
        )
    )
    .subscribe(
    x => console.log(x.data),
    error => console.error(`Ocorreu um erro ao requisitar o URL [https://httpbin.org/status/...] (número de tentativas: 3) ${error.message}`)
    );