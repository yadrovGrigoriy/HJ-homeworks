'use strict';
const counter = document.querySelector('#counter');

if ( localStorage.counter ){
  counter.textContent = localStorage.counter;
} else { 
  counter.textContent = '0';
};

document.querySelector('.wrap-btns')
  .addEventListener('click', e => {
  switch( event.target.id ){
    case "increment":
      counter.textContent = +counter.textContent + 1;
      break;
    case 'decrement':
      if( counter.textContent > 0 )
      counter.textContent = +counter.textContent - 1;
      break;
    case 'reset':
      counter.textContent = 0;   
  };
  localStorage.counter = counter.textContent;
});

