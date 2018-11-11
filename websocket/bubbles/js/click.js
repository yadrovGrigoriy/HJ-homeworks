'use strict';
const connection = new WebSocket('wss://neto-api.herokuapp.com/mouse');
showBubbles(connection)

document.addEventListener('click', () => {
   connection.send(
     JSON.stringify({
      x: event.x,
      y: event.y  
     })
   );
}) 