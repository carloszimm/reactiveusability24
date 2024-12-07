Bacon = require("baconjs");

function requestWithRetry(url, maxTentativas) {
    let tentativas = 0;

    function makeRequest() {
        return Bacon.fromPromise(
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Erro na requisição (status ${response.status})`);
                    }
                    return response.json();
                })
                .catch(error => {
                    retries++;
                    console.error(`Ocorreu um erro ao requisitar a URL ${url} (número de tentativas: ${tentativas})`);
                    if (tentativas < maxTentativas) {
                        return makeRequest();
                    } 
                })
        );
    }

    return makeRequest();
}

Bacon.sequentially(3000, [401, 402, 403, 404, 405, 406, 407, 408, 409, 410])
    .flatMapLatest(statusCode =>
        requestWithRetry(`https://httpbin.org/status/${statusCode}`, 3)
    )
    .onValue(function (val) {
        console.log(val);
    });