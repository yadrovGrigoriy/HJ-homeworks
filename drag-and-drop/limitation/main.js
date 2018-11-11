

const textarea = document.querySelector('.textarea');
textarea.addEventListener('focus', () => {
	document.querySelector('.block').classList.add('active');
})
textarea.addEventListener('blur', () => {
	document.querySelector('.block').classList.remove('active');
})
textarea.addEventListener('keydown', throttle(()=>{
	document.querySelector('.block').classList.add('active');
	document.querySelector('.message').classList.remove('view');
}))
textarea.addEventListener('keydown', debounce(()=>{
	document.querySelector('.block').classList.remove('active');
	document.querySelector('.message').classList.add('view');
},2000))



function debounce(callback, delay){
	let timeout;
	return () => {
		timeout = +'';
		timeout = setTimeout(function(){
			timeout = null;
			callback();
		}, delay);
	};
}

function throttle(callback, delay){
	let isWaiting = false;
	return function() {
		callback.apply();
		isWaiting = true;
		setTimeout(() => {
			isWaiting = false;
		}, delay);
	}
}
