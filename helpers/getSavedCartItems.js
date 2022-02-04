const getSavedCartItems = (parametro) => localStorage.getItem(parametro);

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
