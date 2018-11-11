'use strict';

const sectionWebsocket = document.querySelector('.websocket'); 
const connection = new WebSocket('wss://neto-api.herokuapp.com/comet/websocket');

connection.addEventListener('message', event => {
	const numbers = sectionWebsocket.querySelectorAll('div');
	for(const number of numbers){
		number.classList.remove('flip-it');
		if(number.textContent === event.data){
			number.classList.add('flip-it');
		}
	}
})
