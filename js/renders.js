function renderLists() {
    
    if(!todos.length) {
        listsElement.innerHTML = 'Você ainda não possuí nenhuma lista.'
        listsElement.style.padding = '20px'
        todosListElement.innerHTML = ''
        todosSpace.removeAttribute('style')
    } else {
        listsElement.innerHTML = ''
        listsElement.removeAttribute('style')
        elementVisibility(todosSpace)
        createListsRender()
    }
    
    var createListElement = document.querySelector('#lists-space .create-new-list')
        createListElement.onclick = function() { createPopUpsManager('addList', null) }

    var listElement = document.querySelectorAll('.list')
        listElement.forEach(list => {
            list.onclick = function(event) { showToDosList(event.target) }
        })
}

function renderToDos(list) {
    
    if(list === undefined) { 
        return
    } else {

        if(!list.todo.length && !list.done.length) {
            todosListElement.innerHTML = 'Essa lista ainda não possui nenhum to do.'
            todosListElement.style.padding = '20px'
        } else {
            todosListElement.innerText = ''
            todosListElement.removeAttribute('style')
        } 

        var listElement = document.querySelectorAll('.list')
            listElement.forEach(listElem => {
                listElem.childNodes[0].value === list.name ? activeList(listElem) : false
            })

        let listNameElementHeader = document.querySelector('#todos-space > header')
        let listNameElement = document.querySelector('#todos-space #list-name')
            listNameElement.innerText = list.name
            listNameElementHeader.style.display === '' ? elementVisibility(listNameElementHeader) : false
                    
        let addTodoSpace = document.querySelector('#todos-space > footer')    
            addTodoSpace.style.display === '' ? elementVisibility(addTodoSpace) : false

        let buttonAddNewTodo = document.querySelector('#add-new-todo')
            buttonAddNewTodo.onclick = function() { addTodo() }

        let newTodoTextElement = document.querySelector('#new-todo-text')
            newTodoTextElement.onkeydown = function(event) { 
                event.keyCode === 13 ? addTodo() : false
            }
        
        createToDosRender(list.todo, 'todo')
        createToDosRender(list.done, 'done')
    }
}

