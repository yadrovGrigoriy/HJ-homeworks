
const eyes = document.getElementsByClassName('cat_eye');


document.addEventListener('mousemove', event => {
	let eyeSocket;
	Array.from(eyes).forEach( eye => {
		if(eye.classList.contains('cat_eye_left')){
			eyeSocket  = document.querySelector('.cat_position_for_left_eye');			
		} else {
			eyeSocket = document.querySelector('.cat_position_for_right_eye');
		}
		let eyeSocketBounds = eyeSocket.getBoundingClientRect();

		if(event.pageX > eyeSocketBounds.right){
			eye.style.left = 50 + '%';
		} else if(event.pageX < eyeSocketBounds.left){
			eye.style.left = 0 + 'px';
		} else {
			eye.style.left = 25 + '%';
		}

		if(event.pageY < eyeSocketBounds.top){
			eye.style.top = 0 + 'px';
		} else if(event.pageY > eyeSocketBounds.bottom){
			eye.style.top = 50 + '%';
		} else {
			eye.style.top = 25 + '%';
		}
	})
})