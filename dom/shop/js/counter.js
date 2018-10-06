
const addButtons = document.getElementsByClassName('add');
const pruductItem = document.getElementsByClassName('box'); 
let cartTotalPrice = document.getElementById('cart-total-price');
let totalcount = document.getElementById('cart-count');
let totalPrice = 0;
function add(){
	let currentPrice = this.dataset.price;
	totalPrice += +this.dataset.price;
	cartTotalPrice.innerHTML = getPriceFormatted(totalPrice)
	totalcount.innerHTML = +totalcount.innerHTML + 1;
}

for(const button of addButtons){
	button.addEventListener('click', add); 
}