const fetch = require('isomorphic-fetch');

const fetchData = (userId) => {
  return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Erro ao obter dados do usuário ${userId}: ${response.statusText}`);
      }
      return response.json();
    })
    .then((userData) => {
      console.log(`Dados do usuário ${userId}:`, userData);
    })
    .catch((error) => {
      console.error(error.message);
    });
};

const fetchUserDataStream = () => {
  let userId = 1;
  const intervalId = setInterval(() => {
    fetchData(userId);
    userId++;
    if (userId > 10) {
      clearInterval(intervalId);
    }
  }, 3000);
};

fetchUserDataStream();

// Tempo gasto de 40 minutos