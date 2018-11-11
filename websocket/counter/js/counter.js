'use strict';
const counter = document.querySelector('.counter');
const errors = document.querySelector('output.errors')

const connection = new WebSocket('wss://neto-api.herokuapp.com/counter');

window.addEventListener('beforeunload', () => {
  connection.close(1000, '');
});

connection.addEventListener('message', event => {
  const resp = JSON.parse(event.data);
  counter.innerText = resp.connections
  errors.value = resp.errors
})

