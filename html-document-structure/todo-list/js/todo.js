

const toDoContainer = document.querySelector('.todo-list')
const doneList = toDoContainer.querySelector('.done');
const unDoneList = toDoContainer.querySelector('.undone');
const toDoList = toDoContainer.querySelectorAll('input[type=checkbox]');

function moveDo(event){
	if(event.target.checked === true){
		doneList.appendChild(event.target.parentElement);
	} else {
		unDoneList.appendChild(event.target.parentElement);
	}
}
Array.from(toDoList).forEach(el => {
	el.addEventListener('click', moveDo)
})




