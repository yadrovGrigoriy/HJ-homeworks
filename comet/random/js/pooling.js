'use strict';

const sectionPooling = document.querySelector('.pooling'); 

setInterval(() => {
	const numbers = sectionPooling.querySelectorAll('div');
	fetch('https://neto-api.herokuapp.com/comet/pooling')
		.then(res => res.json())
		.then(res => {
			for(const number of numbers){
				number.classList.remove('flip-it')
				if(+number.textContent === res){
					number.classList.add('flip-it')
				}
			}
	} ) 
}, 1000)


