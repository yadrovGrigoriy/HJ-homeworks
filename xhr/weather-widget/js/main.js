const request = new XMLHttpRequest();
request.addEventListener('load', function(){
	if (request.status === 200) {
  	const response = JSON.parse(request.responseText);
  	setData(response);
	}	
})
request.open('GET', 'https://netology-fbb-store-api.herokuapp.com/weather', true);
request.send();

