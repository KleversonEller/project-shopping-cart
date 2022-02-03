const fetchItem = async (idProduto) => {
  // seu código aqui
  const url = `https://api.mercadolibre.com/items/${idProduto}`;
  const result = await (await fetch(url)).json();
  return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
