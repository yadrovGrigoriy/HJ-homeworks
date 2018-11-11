'use strict';

document.querySelector('.items-list')
  .addEventListener('click', function(event){
    if(event.target.classList.contains('add-to-cart')){
      event.preventDefault();
      addToCart(event.target.dataset);
    }
  })



