function toDosActions(action, toDoName) {

    let listName = document.querySelector('#list-name').innerText
    
    let listPosition = todos.findIndex(elem => elem.name === listName)
    let todoPosition = todos[listPosition].todo.findIndex(todo => todo === toDoName)
    let donePosition = todos[listPosition].done.findIndex(done => done === toDoName)

    if(action === 'addTodo') {
        let newTodoTextElement = document.querySelector('#new-todo-text')
        let newTodoText = newTodoTextElement.value

        if(!newTodoText) {
            newTodoTextElement.focus()
            newTodoTextElement.classList.add('warn')
            newTodoTextElement.setAttribute('data-content', 'Insira um texto para seu todo.')
            newTodoTextElement.onkeydown = function() { 
                newTodoTextElement.classList.remove('warn')
                newTodoTextElement.removeAttribute('data-content')
            }
        } else {
            todos[listPosition].todo.push(newTodoText)
            newTodoTextElement.value = ''
        }

    } else if(action === 'checkToDo') {

        if(todoPosition > -1) {
            todos[listPosition].todo.splice(todoPosition, 1)
            todos[listPosition].done.push(toDoName)
        } else {
            todos[listPosition].done.splice(donePosition, 1)
            todos[listPosition].todo.push(toDoName)
        }
            
    } else if(action === 'editTodo') {

        let newTodoName = document.querySelector('#new-todo-name').value

        if(todoPosition > -1) {
            todos[listPosition].todo.splice(todoPosition, 1)
            todos[listPosition].todo.push(newTodoName)
        } else {
            todos[listPosition].done.splice(donePosition, 1)
            todos[listPosition].done.push(newTodoName)
        }

    } else if(action === 'removeTodo') {

        if(todoPosition > -1) {
            todos[listPosition].todo.splice(todoPosition, 1)
        } else {
            todos[listPosition].done.splice(donePosition, 1)
        }
    }

    saveToStorage()
    clearPopUp()
    renderToDos(todos[listPosition])
}
