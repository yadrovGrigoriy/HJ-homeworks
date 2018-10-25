'use strict';

const url = 'https://neto-api.herokuapp.com/twitter/jsonp';

function loadData(url){
	return new Promise((done, fail) => {
		window[fillTweet] = done;
		const script = document.createElement('script');
		script.src = `${url}?callback=fillTweet`;
		document.body.appendChild(script);		
	})
}
function fillTweet(res){
		document.querySelector('[data-wallpaper]').src = res.wallpaper ; 
		document.querySelector('[data-username]').textContent = res.username; 
		document.querySelector('[data-description]').textContent = res.description; 
		document.querySelector('[data-pic]').src = res.pic; 
		document.querySelector('[data-tweets]').textContent = res.tweets ; 
		document.querySelector('[data-followers]').textContent = res.followers ; 
 		document.querySelector('[data-following]').textContent = res.following ; 
}

loadData(url);
	

