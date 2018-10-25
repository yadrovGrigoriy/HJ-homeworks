'use strict';

function loadData(url, id){
	return new Promise((done, fail) => {
		window.callbackFunction = done;
		const script = document.createElement('script');
		script.src = `${url}?jsonp=callbackFunction`;
		document.body.appendChild(script);
	})	
}

function callbackFunction(){}

function fillProfile(res){
	document.querySelector('[data-name]').textContent = res.name;
	document.querySelector('[data-description]').textContent = res.description;
	document.querySelector('[data-pic]').src = res.pic;
	document.querySelector('[data-position]').textContent = res.position;
}

function fillTechnologies(res){
	res.forEach(el => {
	const span = document.createElement('span');
	span.classList.add('devicons', `devicons-${el}`);
	document.querySelector('[data-technologies]').appendChild(span);
	}) 
}

loadData('https://neto-api.herokuapp.com/profile/me')
	.then(res => {
		fillProfile(res);
		loadData(`https://neto-api.herokuapp.com/profile/${res.id}/technologies`)
			.then(res => {
				fillTechnologies(res);
			})
	})
	.then(() => {
		document.querySelector('.content ').style.display = 'initial';
	})


