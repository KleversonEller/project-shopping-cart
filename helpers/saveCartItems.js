const saveCartItems = (parametro) => {
  // seu código aqui
  localStorage.setItem('cartItems', parametro);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
