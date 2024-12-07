const fetchData = async () => {
  const maxRetries = 3;
  const delayBetweenRequests = 3000;

  for (let status_code = 401; status_code <= 410; status_code++) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const response = await fetch(`https://httpbin.org/status/${status_code}`);
        if (!response.ok) {
          throw new Error('Erro na requisição');
        }

        const result = await response.json();
        console.log(`Dados obtidos para o status ${status_code}:`, result);
        break;
      } catch (error) {
        if (attempt === maxRetries) {
          console.error(`Ocorreu um erro ao requisitar a URL https://httpbin.org/status/${status_code} (número de tentativas: ${maxRetries})`);
        } else {
          console.error(`Tentativa ${attempt} falhou para o status ${status_code}, tentando novamente após 3 segundos...`);
          await delay(delayBetweenRequests);
        }
      }
    }
  }
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

fetchData();

// Tempo gasto de 37 minutos