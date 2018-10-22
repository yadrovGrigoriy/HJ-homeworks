'use strict';

const regForm = document.querySelector( 'sign-up-htm' );
const authForm = document.querySelector( '.sign-in-htm' );

const forms = document.querySelector('.login-form').children;

Array.from(forms)
		.forEach(form => {
      form.querySelector('.button')
        .addEventListener('click', e => {
        	e.preventDefault();
        	const xhr = new XMLHttpRequest();
        	xhr.addEventListener('load', () => {
             responseHandler(xhr,form)  
          });			
          xhr.open('POST', requestAdress(xhr, form)) 
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.send(JSON.stringify(formDataToJSON(form)));
        });
    } );

function responseHandler(xhr, form){
  const response = JSON.parse(xhr.response)
  if( response.error === true){
    form.querySelector('.error-message').textContent = response.message;
    } else {
      if ( form.className === 'sign-in-htm' ){
        form.querySelector('.error-message').textContent = `Пользователь ${response.name} успешно авторизован`;
    	};
    	if ( form.className === 'sign-up-htm' ){
    		form.querySelector('.error-message').textContent = `Пользователь ${response.name} успешно зарегистрирован`;
  	}
  }
}
function requestAdress(xhr, form){
  if( form.className === 'sign-in-htm' ){
  	return 'https://neto-api.herokuapp.com/signin';  
  };
  if( form.className === 'sign-up-htm' ){
    return 'https://neto-api.herokuapp.com/signup';
  };			
}

function formDataToJSON(form){
  const formDataObj = {};
 new FormData(form).forEach(function(value, key){
   formDataObj[key] = value;
 });
 return  formDataObj;
}
