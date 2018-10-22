'use strict';

const colorsPath = 'https://neto-api.herokuapp.com/cart/colors';
const sizePath = 'https://neto-api.herokuapp.com/cart/sizes';
const colorsContainer = document.getElementById('colorSwatch');
const sizesContainer = document.getElementById('sizeSwatch');
const cart = document.getElementById('quick-cart');
const addToCartForm = document.querySelector('#AddToCartForm');



function createSnippetColor(item){
  const elem = document.createElement('div');
  elem.dataset.value = item.type;
  elem.classList.add('swatch-element', 'color', item.type)
  item.isAvailable ? elem.classList.add('available') : elem.classList.add('soldout');
  
  const tooltip = document.createElement('div');
  tooltip.classList.add('tooltip');
  tooltip.textContent = item.title;
  
  const input = document.createElement('input');
  input.setAttribute('quickbeam', 'color');
  input.id = `swatch-1-${item.type}`;
  input.type = 'radio';
  input.name = 'color';
  input.value = item.type;
  if(!item.isAvailable) input.disabled = true;
  
	const label = document.createElement('label');
  label.setAttribute('for', `swatch-1-${item.type}`)
  label.style.borderColor = item.code; 
  
  const labelSpan = document.createElement('span');
  labelSpan.style.backgroundColor = item.code;
  
  const labelImg = document.createElement('img');
  labelImg.classList.add('crossed-out');
  labelImg.src = 'https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886';
  
  elem.appendChild(tooltip);
  elem.appendChild(input);
  label.appendChild(labelSpan);
  label.appendChild(labelImg);
  elem.appendChild(label)
  
  return elem;
}

function createSnippetSize(item){
  const elem = document.createElement('div');
  elem.dataset.value = item.type;
  elem.classList.add("swatch-element", 'plain', "color", item.type);
  item.isAvailable ? elem.classList.add('available') : elem.classList.add('soldout');
  
  const input = document.createElement('input');
  input.id = `swatch-1-${item.type}`;
  input.type = 'radio';
  input.name = 'size';
  input.value = item.type;
  if(!item.isAvailable) input.disabled = true;
  
	const label = document.createElement('label');
  label.setAttribute('for', `swatch-1-${item.type}`);
  label.textContent = item.title;
  
  
  const labelImg = document.createElement('img');
  labelImg.classList.add('crossed-out');
  labelImg.src = 'https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886';
  
  elem.appendChild(input);
  label.appendChild(labelImg);
  elem.appendChild(label)
  
  return elem;
}

function createSnippetProduct(item){
  const elem = document.createElement('div');
  elem.classList.add('quick-cart-product', 'quick-cart-product-static');
  elem.id = `quick-cart-product-${item.id}`;
  elem.style.opacity = 1;
  
  const divWrap = document.createElement('div');
  divWrap.classList.add('quick-cart-product-wrap');
  
  const img = document.createElement('img');
  img.src = item.pic;
  img.title = item.title;

  const spanS1 = document.createElement('span');
  spanS1.classList.add('s1');
  spanS1.style.backgroundColor = '#000';
  spanS1.opacity = 0.5;
  spanS1.textContent = item.price;

  const spanS2 = document.createElement('span');
  spanS2.classList.add('s2');

  const spanCount = document.createElement('span');
  spanCount.classList.add('count' , 'hide' , 'fadeUp');
  spanCount.id = `quick-cart-product-count-${item.id}`;
  spanCount.textContent = item.quantity;

  const spanRemove = document.createElement('span');
  spanRemove.classList.add('quick-cart-product-remove', 'remove');
  spanRemove.dataset.id = item.id;

  elem.appendChild(divWrap);
  elem.appendChild(spanCount);
  elem.appendChild(spanRemove);
	divWrap.appendChild(img);
  divWrap.appendChild(spanS1);
  divWrap.appendChild(spanS2);
 
  return elem;
}

function basketSnippet(sum){
  const elem = document.createElement('a');
  elem.id = 'quick-cart-pay';
  elem.setAttribute('quickbeam', 'cart-pay');
  elem.classList.add('cart-ico', 'open');
  elem.innerHTML = 
         `<span>
            <strong class="quick-cart-text">Оформить заказ<br></strong>
            <span id="quick-cart-price">${sum}</span>
          </span>`;
 
  return elem;
}

function updateCart(){
  cart.innerHTML = '';
  let cartSum = 0;
  fetch('https://neto-api.herokuapp.com/cart', {
    method: 'GET'
  })
    .then(res => {
      if(200 <= res.status && res.status < 300){
         return res;
      }
      throw new Error();
    })
    .then(res => res.json())
    .then(response => {
      response.forEach(function(el){
        cart.appendChild(createSnippetProduct(el))
        cartSum += el.price * el.quantity;   
      })
    })
    .then(() => {
      if(cart.innerHTML !== ''){
        cart.appendChild(basketSnippet(cartSum))
      }
  })
}   
/**

Обработка запросов на добавление и удаление

**/

addToCartForm.addEventListener('submit', event => {
  event.preventDefault();
  addToCart();
})

function addToCart(){
  const formData = new FormData(addToCartForm);
  formData.append('productId', addToCartForm.dataset.productId);
  
  fetch('https://neto-api.herokuapp.com/cart', {
        method: 'POST',
        body: formData,
  })
        .then(res => {
          if (200 <= res.status && res.status < 300) {
                return res;
            }
            throw new Error(res.statusText);
        })
        .then(response => response.json())
        .then(data => {
          if(!data.error){
            updateCart();
          } else {
            throw new Error();
          }   
        })
        .catch(err => {
          console.error(err)
        })
}

cart.addEventListener('click', event => {
		event.preventDefault();
		if(!event.target.classList.contains('quick-cart-product-remove')){
			return;
		}
		removeOfCart(event);
	})

function removeOfCart(){
		const formData = new FormData();
  	formData.append('productId', addToCartForm.dataset.productId);
  	fetch('https://neto-api.herokuapp.com/cart/remove', {
  		method: 'POST',
  		body: formData,
  	})
  			.then(response => {
  				if (200 <= response.status && response.status < 300) {
          	return response;
          }
            throw new Error(res.statusText);
  			})
  			.then(response =>{
  				response.json()
  		})
  			.then(data => {
            updateCart();
        })
}

addToCartForm.addEventListener('change', event => {
    event.preventDefault();
    safeState();
});
function safeState(){
	const formData = new FormData(addToCartForm);
    let obj = {};
    for(const [key, value] of formData){
        obj[key] = value;
    }
    localStorage.setItem('addToCartForm', JSON.stringify(obj));
}


Promise.all([
    fetch(colorsPath, {
        method: 'GET'
    }),
    fetch(sizePath, {
        method: 'GET'
    })
])
    .then(([colors, sizes]) => {
        if ( ( 200 <= colors.status && colors.status < 300 ) && ( 200 <= sizes.status && sizes.status < 300 ) ) {
            return [colors, sizes];
        }
        throw new Error();
    })
    .then( ([colors, sizes]) => {
        Promise.all([colors.text(), sizes.text()])
            .then( ([colors, sizes]) => {
                const jsonColors = JSON.parse(colors);
                const jsonSizes = JSON.parse(sizes);
                return [jsonColors, jsonSizes];
            })
            .then( ([colors, sizes]) => {
                colors.forEach(function (el, i) {
                    colorsContainer.appendChild(createSnippetColor(el, i));
                });
                sizes.forEach(function (el, i) {
                    sizesContainer.appendChild(createSnippetSize(el, i));
                });
             } )
                updateCart();
    } );

    