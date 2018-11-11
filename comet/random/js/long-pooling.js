'use strict';
const sectionLongPooling = document.querySelector('.long-pooling');

const numbers = sectionLongPooling.querySelectorAll('div');

subscribe()

function subscribe(url){	
	const xhr = new XMLHttpRequest();
	xhr.addEventListener('load', () => {
		for(const number of numbers){
			number.classList.remove('flip-it');
			if(+number.textContent === JSON.parse(xhr.response)){
				number.classList.add('flip-it');
			}
		}
		subscribe()
	})
	xhr.open('GET', 'https://neto-api.herokuapp.com/comet/long-pooling');
	xhr.send()
}
