'use strict';

let movedItem = null;
const trashBin = document.querySelector('#trash_bin');
let shiftX = 0;
let shiftY = 0;

document.addEventListener('mousedown', event => {
	if(event.which != 1){
		return;
	}
	if(event.target.classList.contains('logo')){
		movedItem = event.target;
		const bounds = event.target.getBoundingClientRect();
		shiftX =  bounds.width/2 - window.pageXOffset;
		shiftY =  bounds.height/2 - window.pageYOffset;
	}
})

document.addEventListener('mousemove', event => {
	if(movedItem){
		event.preventDefault();
		movedItem.style.left = event.pageX - shiftX  + 'px';
		movedItem.style.top = event.pageY  - shiftY + 'px';
		movedItem.classList.add('moving')
	}
})

document.addEventListener('mouseup', event => {
	if(movedItem){
		const check = document.elementFromPoint(event.clientX, event.clientY)
		if(check){
			check.appendChild(movedItem);
			movedItem.classList.remove('moving');			
			movedItem = null;
		}
	}
})