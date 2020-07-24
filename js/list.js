function addList() {

    let newListNameElement = document.querySelector('#new-list-name')
    let newListName = document.querySelector('#new-list-name').value
    let position = todos.length
    let pos = todos.findIndex(elem => elem.name === newListName)

    if(!newListName) {
        newListNameElement.focus()
        newListNameElement.classList.add('warn')
        newListNameElement.onkeydown = function() { newListNameElement.classList.remove('warn') }
    } else if(pos > -1){  
        clearPopUp()
        createPopUpsManager('sendMessage','Você já possui uma lista com esse nome. Escolha outro.')
    } else {
        todos[position] = {name: newListName, todo: [], done: []}

        finalize(todos[position])
    }
}

function editList(oldListName) {

    let newListName = document.querySelector('#new-list-name').value
    let position = todos.findIndex(elem => elem.name === oldListName)
    let pos = todos.findIndex(elem => elem.name === newListName)

    if(pos > -1) {
        clearPopUp()
        createPopUpsManager('sendMessage','Você já possui uma lista com esse nome. Escolha outro.')
    } else {
        todos[position].name = newListName
        finalize(todos[position])
    }

}

function showToDosList(element) {
    
    let listName = element.parentNode.childNodes[0].value
    let position = todos.findIndex(elem => elem.name === listName)

    renderToDos(todos[position])
}

function removeList(listName) {

    let position = todos.findIndex(elem => elem.name === listName)

    todos.splice(position, 1)

    finalize(todos[0])
}

function activeList(element) {

    disableLists()
    element.classList.add('active')
}

function disableLists() {

    let activeLists = document.querySelectorAll('.active')
        activeLists.forEach(element => {
            element.classList.remove('active')
        })
}

function finalize(toDoList) {

    saveToStorage()
    clearPopUp()
    renderLists()
    
    toDoList ? renderToDos(toDoList) : false
}