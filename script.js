function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function valoresASalvar() {
  const conteudoCar = document.querySelectorAll('.cart__items li');
  const conteudoSalvar = [...conteudoCar].map((item) => item.innerHTML);
  return JSON.stringify(conteudoSalvar);
}

function somaValores() {  
  const conteudoCar = document.querySelectorAll('.cart__items li');
  const pegaValor = [...conteudoCar].map((item) => item.innerHTML.split('$')[1])
  .reduce((total, valor) => total + (parseFloat(valor)), 0);
  return pegaValor;
}

function valorCompra() {
  const totalCar = document.querySelector('.total-price');
  totalCar.innerHTML = somaValores();
}

function cartItemClickListener(event) {
  // coloque seu código aqui
  const pai = event.target.parentElement;
  pai.removeChild(event.target);  
  saveCartItems(valoresASalvar());
  valorCompra();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}
const section = document.querySelector('.items');

function loading() {
  const span = document.createElement('span');
  span.innerHTML = 'carregando';
  span.className = 'loading';
  section.appendChild(span);
}

async function createProduct() {
  const produtos = await fetchProducts('computador');
  section.removeChild(document.querySelector('.loading'));
  produtos.results.forEach(({ id, title, thumbnail }) => {
    const objeto = { sku: id, name: title, image: thumbnail };
    section.appendChild(createProductItemElement(objeto));
  });
}

const btnAdd = document.querySelector('.items');

const car = document.querySelector('.cart__items');
btnAdd.addEventListener('click', async (elemento) => {
  const idProdutoClick = elemento.target.parentNode.firstChild.innerText;
  const produto = await fetchItem(idProdutoClick);
  const objeto = { sku: produto.id, name: produto.title, salePrice: produto.price };
  car.appendChild(createCartItemElement(objeto));
  saveCartItems(valoresASalvar());
  valorCompra();
});

function itensCarSave() {
  const itensSalvos = getSavedCartItems('cartItems');
  JSON.parse(itensSalvos).forEach((conteudo) => {
    const li = document.createElement('li');
    li.className = 'cart__item';
    li.innerText = conteudo;
    li.addEventListener('click', cartItemClickListener);
    car.appendChild(li);
    valorCompra();
  });
}

const btnRemove = document.querySelector('.empty-cart');

btnRemove.addEventListener('click', () => {
  const produtosCar = document.querySelectorAll('.cart__items .cart__item');
  produtosCar.forEach((item) => {
    const pai = item.parentNode;
    pai.removeChild(item);
  });
  saveCartItems(valoresASalvar());
  valorCompra();
});

window.onload = async () => {
  loading();
  await createProduct();  
  itensCarSave();
};
