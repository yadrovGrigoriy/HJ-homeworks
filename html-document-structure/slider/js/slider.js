const slides = document.getElementsByClassName('slides')[0];
const buttons = document.querySelectorAll('.slider-nav')[0].children;
const currentSlide = slides.querySelector('.slide-current');

function moveSlide(){
	let activeSlide;
	const currentSlide = slides.querySelector('.slide-current');
	currentSlide.classList.remove('slide-current');
	switch(event.target.dataset.action){
		case 'next':
			activeSlide = currentSlide.nextElementSibling;
			break;
		case 'prev':
			activeSlide = currentSlide.previousElementSibling;
			break;
		case 'last':
			activeSlide = slides.lastElementChild;
			event.target.disabled
			break;
		case 'first':
			activeSlide = slides.firstElementChild;	
	}

	activeSlide.classList.add('slide-current');
	firstOrLastSlide(activeSlide);
}

function firstOrLastSlide(slide){
	if(!slide.nextElementSibling){
		buttons[3].classList.add('disabled')
		buttons[1].classList.add('disabled');
		buttons[3].removeEventListener('click', moveSlide);
		buttons[1].removeEventListener('click', moveSlide);  
	} else {
		buttons[3].classList.remove('disabled');
		buttons[1].classList.remove('disabled');
		buttons[3].addEventListener('click', moveSlide);
		buttons[1].addEventListener('click', moveSlide); 
	}
	if(!slide.previousElementSibling){
		buttons[2].classList.add('disabled')
		buttons[0].classList.add('disabled');
		buttons[2].removeEventListener('click', moveSlide);
		buttons[0].removeEventListener('click', moveSlide);  
	} else {
		buttons[2].classList.remove('disabled')
		buttons[0].classList.remove('disabled');
		buttons[2].addEventListener('click', moveSlide);
		buttons[0].addEventListener('click', moveSlide); 
	}
}


if(!Array.from(slides.children).some(slide => slide.classList.contains('slide-current'))){
	slides.firstElementChild.classList.add('slide-current')
}

Array.from(buttons).forEach(button => {
	button.addEventListener('click', moveSlide);
	firstOrLastSlide(slides.firstElementChild);
})