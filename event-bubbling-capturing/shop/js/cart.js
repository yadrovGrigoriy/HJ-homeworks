'use strict';

handler();

showMore.addEventListener( 'click', handler);

function handler(){
	const addToCartButton = document.querySelectorAll( '.add-to-cart' );
	Array
	.from(addToCartButton)
	.forEach((el) => {
		el.addEventListener( 'click', (event) => {
			event.preventDefault();
			addToCart( event.target.dataset )
		})		
	})	
}



