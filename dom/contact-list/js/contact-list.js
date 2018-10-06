
const contactsJSON = loadContacts();
const contacts = JSON.parse(contactsJSON);
let contactCards = document.getElementsByClassName('contacts-list')[0];

for(const contact of contacts){
	let li = document.createElement('li');
	li.innerHTML = `<strong>${contact.name}</strong>`;
	li.dataset.email = contact.email;
	li.dataset.phone = contact.phone;
	contactCards.appendChild(li);
}
	
