const fetchProducts = async (produto) => {
  // seu código aqui
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${produto}`;

  const result = await (await fetch(url)).json();
  return result.results;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
