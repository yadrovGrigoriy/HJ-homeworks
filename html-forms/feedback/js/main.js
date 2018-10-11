
const form = document.getElementsByClassName('contentform')[0];
const submitButton = document.getElementsByClassName('button-contact')[0];
const editButton = document.getElementsByClassName('button-contact')[1];
const outputMessage = document.getElementById('output');
const userLastName = document.querySelector('input[name=lastname]');
const userName = document.querySelector('input[name=name]');
const userEmail = document.querySelector('input[name=email]');
const userCompany = document.querySelector('input[name=company]');
const userAddress = document.querySelector('input[name=address]');
const userZip = document.querySelector('input[name=zip]');
const userCity = document.querySelector('input[name=city]');
const userPhone = document.querySelector('input[name=phone]');
const userRole = document.querySelector('input[name=role]');
const userThemeMessage = document.querySelector('input[name=subject]');
const userMessage = document.querySelector('textarea[name=message]');
const allOutputFields = document.querySelectorAll('#output output' );

const fields = [
	userLastName,
	userName,
	userEmail,
	userCompany,
	userAddress,
	userZip,
	userCity,
	userPhone,
	userRole,
	userThemeMessage,
	userMessage];



function zipValidate(){
	userZip.value = userZip.value.replace(/[^\d,]/g, '');
}

function isFill(){
	if(fields.some(field => !field.dataset.check === true)){
		submitButton.setAttribute('disabled', 'disabled');
		} else {
		submitButton.removeAttribute('disabled'); 
	}
}

function fillOutput(){
	for(const field of fields){
		if(document.getElementById(field.name)){
			document.getElementById(field.name).value = field.value;	
		}
	}
}	


submitButton.addEventListener('click', function(event){
	event.preventDefault();
	outputMessage.classList.toggle('hidden');
	form.classList.add('hidden');
	fillOutput();
})

editButton.addEventListener('click', function(event){
	event.preventDefault();
	outputMessage.classList.toggle('hidden');
	form.classList.remove('hidden');
})

userZip.addEventListener('input', zipValidate)

for(const field of fields){
	field.addEventListener('input', function(){
		if(!(field.value === '')){
			field.dataset.check = true;
			isFill();
		} else {
			 field.removeAttribute("data-check");
			 isFill();
		}
	});
}


	






