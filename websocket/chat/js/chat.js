'use strict'

const chat = document.querySelector('.chat');
const chatStatus = chat.querySelector('.chat-status');
const messageInput = chat.querySelector('.message-input')
const messageSubmit = chat.querySelector('.message-submit');
const messageStatus = chat.querySelector('.message-status');
const messageContent = chat.querySelector('.messages-content');
const messagePersonal = chat.querySelector('.message-personal');
const messageBlock = chat.querySelector('.messages-templates');
const loading = chat.querySelector('.loading');
const form = chat.querySelector('.message-box');

const connection = new WebSocket('wss://neto-api.herokuapp.com/chat');

const messageStatusClone = messageStatus.cloneNode(true);
let messageContentStatus = messageContent.appendChild(messageStatusClone);


function formatDate() {
	const date = new Date()
	let hh = date.getHours();
	(hh < 10) ? hh = `0${hh}` : hh ;
	let mm = date.getMinutes();
	(mm < 10) ? mm = `0${mm}` : mm ;
  return `${hh}:${mm}`;
}

function showMessage (message) {
	const timeStamp = formatDate();
	const messageClone = messageBlock.children[1].cloneNode(true);
	messageClone.children[1].textContent = message;
	messageClone.children[2].textContent = timeStamp;
	messageContent.appendChild(messageClone);
}

function sendMessage () {
	const timeStamp = formatDate();
	const messagePersonalClone = messagePersonal.cloneNode(true);
	messagePersonalClone.children[0].textContent = messageInput.value;
	messagePersonalClone.children[1].textContent = timeStamp;
	messageContent.appendChild(messagePersonalClone);
	connection.send(messageInput.value);
		
	if (messageInput.value === 'close') {
		connection.close(1000);
	}
	messageInput.value = '';
}

connection.addEventListener('open', () => {
	chatStatus.textContent = chatStatus.dataset.online;
	messageSubmit.disabled = false;
	messageContentStatus.children[0].textContent = 'Пользователь появился в сети';
	connection.send('Пользователь появился в сети');
});

messageSubmit.addEventListener('click', event => {
	event.preventDefault();
	if (!messageInput.value) {
		return
	}
	sendMessage();
});

document.addEventListener('keyup', event => {
	if (event.code !== 'Enter'){
		return
	}
	if (!messageInput.value) {
		return
	}
	sendMessage();
})


connection.addEventListener('message', event => {
	if (event.data === '...') {
		if (messageContent.querySelector('.loading')){
			messageContent.querySelectorAll('.message-status')[messageContent.querySelectorAll('.message-status').length-1].outerHTML = '';
			messageContent.querySelector('.loading').outerHTML ='';
		}
		messageContentStatus.children[0].textContent = 'Пишет сообщение';
			const loadingClone = loading.cloneNode(true);
			const messageContentLoading = messageContent.appendChild(loadingClone);
	} else {
		if (messageContent.querySelector('.loading')) {
			setStatus('wrote');
		}
		showMessage(event.data);	
	}	
});

connection.addEventListener('error', error => {
	console.log(`Произошла ошибка: ${error.data}`);
});

connection.addEventListener('close', () => {
	chatStatus.textContent = chatStatus.dataset.offline;
	messageSubmit.disabled = true;
	messageContentStatus.children[0].textContent = 'Пользователь не в сети';
});
