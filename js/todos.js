function addTodo() {

    let listName = document.querySelector('#list-name').innerText
    let newTodoTextElement = document.querySelector('#new-todo-text')
    let newTodoText = newTodoTextElement.value

    let position = todos.findIndex(elem => elem.name === listName)

    if(!newTodoText) {
        newTodoTextElement.focus()
        newTodoTextElement.classList.add('warn')
        createPopUpsManager('sendMessage','Insira um texto para seu to do.')
        newTodoTextElement.onkeydown = function() { newTodoTextElement.classList.remove('warn') }
    } else {
        todos[position].todo.push(newTodoText)
        newTodoTextElement.value = ''
        finalizeToDo(todos[position], true) 
    }
}

function checkToDo(element) {

    let listName = document.querySelector('#list-name').innerText
    let todoName = element.parentNode.childNodes[2].value

    let listPosition = todos.findIndex(elem => elem.name === listName)
    let todoPosition = todos[listPosition].todo.findIndex(todo => todo === todoName)
    let donePosition = todos[listPosition].done.findIndex(done => done === todoName)

    if(element.hasAttribute('checked')) {
        element.setAttribute('checked', 'false')
        todos[listPosition].done.splice(donePosition, 1)
        todos[listPosition].todo.push(todoName)
    } else {
        element.setAttribute('checked', 'checked')
        todos[listPosition].todo.splice(todoPosition, 1)
        todos[listPosition].done.push(todoName)
    }    
    finalizeToDo(todos[listPosition]) 
}

function editToDo(oldTodoName) {
    
    let listName = document.querySelector('#list-name').innerText
    let newTodoName = document.querySelector('#new-todo-name').value

    let listPosition = todos.findIndex(elem => elem.name === listName)
    let todoPosition = todos[listPosition].todo.findIndex(todo => todo === oldTodoName)
    let donePosition = todos[listPosition].done.findIndex(done => done === oldTodoName)

    if(todoPosition > -1) {
        todos[listPosition].todo.splice(todoPosition, 1)
        todos[listPosition].todo.push(newTodoName)
    } else {
        todos[listPosition].done.splice(donePosition, 1)
        todos[listPosition].done.push(newTodoName)
    }
    finalizeToDo(todos[listPosition], true) 
}

function removeToDo(toDoName) {

    let listName = document.querySelector('#list-name').innerText

    let listPosition = todos.findIndex(elem => elem.name === listName)
    let todoPosition = todos[listPosition].todo.findIndex(todo => todo === toDoName)
    let donePosition = todos[listPosition].done.findIndex(done => done === toDoName)

    if(todoPosition > -1) {
        todos[listPosition].todo.splice(todoPosition, 1)
    } else {
        todos[listPosition].done.splice(donePosition, 1)
    }
    finalizeToDo(todos[listPosition], true) 
}

function finalizeToDo(list, popUp) {
    saveToStorage()
    renderToDos(list)
    popUp ? clearPopUp() : false
}