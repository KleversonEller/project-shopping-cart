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

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  // coloque seu código aqui
  const pai = event.target.parentElement;
  pai.removeChild(event.target);
  saveCartItems();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function createProduct() {
  const section = document.querySelector('.items');
  const produtos = await fetchProducts('computador');
  produtos.forEach(({ id, title, thumbnail }) => {
    const objeto = { sku: id, name: title, image: thumbnail };
    section.appendChild(createProductItemElement(objeto));
  });
}

const btnAdd = document.querySelector('.items');

btnAdd.addEventListener('click', async (elemento) => {
  const car = document.querySelector('.cart__items');
  const idProdutoClick = elemento.target.parentNode.firstChild.innerText;
  const produto = await fetchItem(idProdutoClick);
  const objeto = { sku: produto.id, name: produto.title, salePrice: produto.price };
  car.appendChild(createCartItemElement(objeto));
  saveCartItems();
});

function itensCarSave() {
  const car = document.querySelector('.cart__items');
  const itensSalvos = getSavedCartItems();
  itensSalvos.forEach((conteudo) => {
    const li = document.createElement('li');
    li.className = 'cart__item';
    li.innerText = conteudo;
    li.addEventListener('click', cartItemClickListener);
    car.appendChild(li);
  });
}

window.onload = () => {
  createProduct();
  itensCarSave();
};
