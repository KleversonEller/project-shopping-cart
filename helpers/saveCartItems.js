const saveCartItems = () => {
  // seu código aqui
  const conteudoCar = document.querySelectorAll('.cart__items li');
  const conteudoSalvar = [...conteudoCar].map((item) => item.innerHTML);
  localStorage.setItem('cartItems', JSON.stringify(conteudoSalvar));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
