// Principal Variable

var todos = JSON.parse(localStorage.getItem('todos_list')) || []
let currentList;

// Global Variables

let popupElement = document.querySelector('#pop-up')
var popupContentElement = document.querySelector('#pop-up > div')
var popupContentButtons = document.querySelector('#pop-up #btns')

let listsSpace = document.querySelector('#lists-space')
let todosSpace = document.querySelector('#todos-space')

let listsElement = document.querySelector('#todo-lists') /* Lists */
let todosListElement = document.querySelector('#todos-list') 


// Global Buttons

let buttonShowLists = document.querySelector('#show-lists')
    buttonShowLists.onclick = function() { 
        elementVisibility(listsSpace)
        renderLists()
    }

let buttonCreateList = document.querySelector('.create-new-list')
    buttonCreateList.onclick = function() { createPopUpsManager('addList', null) }
    

// Global Functions

function saveToStorage() { 
    localStorage.setItem('todos_list', JSON.stringify(todos))
}

function elementVisibility(element) { 
    
    element.style.display === '' ? element.style.display = 'flex' : element.removeAttribute('style')
    
    element.id === listsSpace.id && closeLists();
}

function closeLists() {
    if(listsSpace.style.display === 'flex') {
        buttonShowLists.childNodes[1].setAttribute('class', 'fa fa-times')
        buttonShowLists.childNodes[1].style.color = 'white';

    } else {
        buttonShowLists.childNodes[1].setAttribute('class', 'fa fa-list')
        buttonShowLists.childNodes[1].removeAttribute('style')
    }

}