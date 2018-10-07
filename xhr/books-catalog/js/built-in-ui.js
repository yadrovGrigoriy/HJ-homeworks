/* Данный JS код */

// Регулируем видимость карточки
function toggleCardVisible () {
 document.getElementById('content').classList.toggle('hidden');
 document.getElementById('card').classList.toggle('hidden');
}


document.getElementById('close').addEventListener('click', toggleCardVisible);

document.getElementById('content').addEventListener('click', (event) => {
    let target = null;
    if (event.target.tagName === 'LI') {
        target = event.target;
    }
    if (event.target.parentNode.tagName === 'LI') {
        target = event.target.parentNode;
    }

    if (target) {
      toggleCardVisible();
      document.getElementById('card-title').innerHTML = target.dataset.title;
      document.getElementById('card-author').innerHTML = target.dataset.author;
      document.getElementById('card-info').innerHTML = target.dataset.info;
      document.getElementById('card-price').innerHTML = target.dataset.price;
    }
});

const content = document.getElementById('content');
const xhr = new XMLHttpRequest();

xhr.addEventListener('load', function(){
    let booksList = JSON.parse(xhr.responseText);
    for(const book of booksList){
      let li = document.createElement('li');
      li.innerHTML = `<img src = "${book.cover.small}">`;
      li.dataset.title = book.title;
      li.dataset.author = book.author.name;
      li.dataset.info = book.info;
      li.dataset.price = book.price;
      content.appendChild(li);
    }      
  });

xhr.open('GET', 'https://neto-api.herokuapp.com/book/');
xhr.send();


