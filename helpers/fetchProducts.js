const fetch = require('node-fetch');

const fetchProducts = async () => {
  // seu código aqui
  const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';

  const result = await (await fetch(url)).json();
  console.log(result.results);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}

fetchProducts();