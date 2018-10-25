const articleList = document.getElementsByClassName('tabs-content')[0];
const tabsNav = document.getElementsByClassName('tabs-nav')[0];
const cloneFirstTab = tabsNav.firstElementChild.cloneNode(true);
let delEl  = tabsNav.removeChild(tabsNav.firstElementChild);

Array.from(articleList.children).forEach(el => {
	let li =  cloneFirstTab.cloneNode(true);
	li.firstElementChild.textContent = el.dataset.tabTitle;
	li.firstElementChild.classList.add(el.dataset.tabIcon)
	el.classList.add('hidden')
	tabsNav.appendChild(li)
})
function isArticleActive(){
	Array.from(articleList.children).forEach(el => {
		// console.log(el)
		if(el.dataset.active === true){
			el.classList.remove('hidden');
		} 
		// else {
		// 	el.classList.add('hidden');
		// }
	})
}

tabsNav.firstElementChild.classList.add('ui-tabs-active');
articleList.firstElementChild.classList.remove('hidden');
articleList.firstElementChild.dataset.active = true;

Array.from(tabsNav.children).forEach(tab => {
	tab.addEventListener('click', function(){
		let currentTab = tabsNav.querySelector('.ui-tabs-active');
		console.log(currentTab)
		let currentArticle = articleList.querySelector('[data-active=true]');
		console.log(currentArticle)
		Array.from(articleList.children).forEach(el =>{
			if(el.dataset.tabIcon === currentTab.firstElementChild.classList[1]){
				currentArticle.dataset.active = false;
				currentArticle = el;
				el.dataset.active = true;
			}
		})
		

		currentTab.classList.remove('ui-tabs-active');
		currentTab = tab;
		tab.classList.add('ui-tabs-active')
	})
})