function createPopUpsManager(action, element) {    

    elementVisibility(popupElement)
    elementVisibility(popupContentElement)

    action === 'addList' ? createPopUpAddList() : false
    action === 'editList' ? createPopUpEditList(element) : false
    action === 'removeList' ? createPopUpRemoveList(element) : false

    action === 'editToDo' ? createPopUpEditToDo(element) : false
    action === 'removeToDo' ? createPopUpRemoveToDo(element) : false

    action === 'sendMessage' ? createPopUpSendMessage(element) : false

    popupActions() 
}

function createListsRender() {
    
    for(let position in todos.reverse()) {
        
        let liElement = document.createElement('li')
            liElement.setAttribute('class', 'list')
            liElement.setAttribute('onclick', 'showToDosList(this)')
        let textInput = document.createElement('input')
            textInput.setAttribute('type', 'text')
            textInput.setAttribute('readonly', 'true')
            textInput.setAttribute('class', 'list-name')          
            textInput.value = todos[position].name
            textInput.setAttribute('onclick', 'showToDosList(this)')
        let buttonEdit = document.createElement('button')
            buttonEdit.setAttribute('class', 'list-edit')
            buttonEdit.setAttribute('onclick', 'createPopUpsManager("editList", this)')
        let buttonEditIcon = document.createElement('i')
            buttonEditIcon.setAttribute('class', 'fa fa-pencil-alt')
            buttonEdit.appendChild(buttonEditIcon)
        let buttonRemove = document.createElement('button')
            buttonRemove.setAttribute('class', 'list-remove')
            buttonRemove.setAttribute('onclick', 'createPopUpsManager("removeList", this)')
        let buttonRemoveIcon = document.createElement('i')
            buttonRemoveIcon.setAttribute('class', 'fa fa-times')
            buttonRemove.appendChild(buttonRemoveIcon)

        liElement.appendChild(textInput)
        liElement.appendChild(buttonEdit)
        liElement.appendChild(buttonRemove)

        listsElement.appendChild(liElement)
    }
}

function createToDosRender(list, type) {

    for(let item of list.reverse()) {

        let liElement = document.createElement('li')
            liElement.setAttribute('class', 'todo')
        let itemCheck = document.createElement('input')
            itemCheck.setAttribute('type', 'checkbox')
            itemCheck.setAttribute('class', 'todo-check')
            itemCheck.setAttribute('onclick', 'checkToDo(this)')
        let checkmark = document.createElement('span')
            checkmark.setAttribute('class', 'checkmark')
        let textInput = document.createElement('input')
            textInput.setAttribute('type', 'text')
            textInput.setAttribute('readonly', 'true')
            textInput.setAttribute('class', 'todo-name')          
            textInput.value = item
        let buttonEdit = document.createElement('button')
            buttonEdit.setAttribute('class', ' todo-edit')
            buttonEdit.setAttribute('onclick', 'createPopUpsManager("editToDo", this)')
        let buttonEditIcon = document.createElement('i')
            buttonEditIcon.setAttribute('class', 'fa fa-pencil-alt')
            buttonEdit.appendChild(buttonEditIcon)
        let buttonRemove = document.createElement('button')
            buttonRemove.setAttribute('class', 'todo-remove')
            buttonRemove.setAttribute('onclick', 'createPopUpsManager("removeToDo", this)')
        let buttonRemoveIcon = document.createElement('i')
            buttonRemoveIcon.setAttribute('class', 'fa fa-times')
            buttonRemove.appendChild(buttonRemoveIcon)

        type === 'done' ? itemCheck.setAttribute('checked', 'checked') : false

        liElement.appendChild(itemCheck)
        liElement.appendChild(checkmark)
        liElement.appendChild(textInput)
        liElement.appendChild(buttonEdit)
        liElement.appendChild(buttonRemove)
        todosListElement.appendChild(liElement)
    }
}


function createPopUpAddList() {

    let textInput = document.createElement('input')
        textInput.setAttribute('type', 'text')
        textInput.setAttribute('id', 'new-list-name')
        textInput.setAttribute('placeholder', 'Nome da lista')            
    let buttonCancel = document.createElement('button')
        buttonCancel.setAttribute('class', 'btn-cancel')
        buttonCancel.innerText = 'Cancelar'
    let buttonAgree = document.createElement('button')
        buttonAgree.setAttribute('id', 'agree')
        buttonAgree.innerText = 'Adicionar Lista'

    buttonAgree.onclick = function () { addList() }

    popupContentButtons.appendChild(buttonCancel)
    popupContentButtons.appendChild(buttonAgree)
    popupContentElement.prepend(textInput)

    let textInputElement = document.querySelector('#new-list-name')
        textInputElement.focus()
}

function createPopUpEditList(param) {

    var oldListName = param.parentNode.childNodes[0].value

    let textInput = document.createElement('input')
        textInput.setAttribute('type', 'text')
        textInput.setAttribute('id', 'new-list-name')
        textInput.setAttribute('placeholder', 'Novo nome para a lista')
        textInput.setAttribute('id', 'new-list-name')
        textInput.value = oldListName
    let buttonCancel = document.createElement('button')
        buttonCancel.setAttribute('class', 'btn-cancel')
        buttonCancel.innerText = 'Cancelar'
    let buttonAgree = document.createElement('button')
        buttonAgree.setAttribute('id', 'agree')
        buttonAgree.innerText = 'Renomear Lista'

    buttonAgree.onclick = function () { editList(oldListName) }

    popupContentButtons.appendChild(buttonCancel)
    popupContentButtons.appendChild(buttonAgree)
    popupContentElement.prepend(textInput)

    let textInputElement = document.querySelector('#new-list-name')
        textInputElement.focus()
}
function createPopUpRemoveList(param) {
    
    var listName = param.parentNode.childNodes[0].value

    let text = document.createElement('p')
        text.innerText = 'Confirma a exclusão da lista "' + listName + '"?'            
    let buttonCancel = document.createElement('button')
        buttonCancel.setAttribute('class', 'btn-cancel')
        buttonCancel.innerText = 'Cancelar'
    let buttonAgree = document.createElement('button')
        buttonAgree.setAttribute('id', 'agree')
        buttonAgree.innerText = 'Remover Lista'
    
    buttonAgree.onclick = function () { removeList(listName) }
    
    popupContentButtons.appendChild(buttonCancel)
    popupContentButtons.appendChild(buttonAgree)
    popupContentElement.prepend(text)
}

function createPopUpEditToDo(param) {

    var oldToDoName = param.parentNode.childNodes[2].value

    let textInput = document.createElement('input')
        textInput.setAttribute('type', 'text')
        textInput.setAttribute('placeholder', 'Nova descrição para o to do.')
        textInput.setAttribute('id', 'new-todo-name')
        textInput.value = oldToDoName
    let buttonCancel = document.createElement('button')
        buttonCancel.setAttribute('class', 'btn-cancel')
        buttonCancel.innerText = 'Cancelar'
    let buttonAgree = document.createElement('button')
        buttonAgree.setAttribute('id', 'agree')
        buttonAgree.innerText = 'Renomear To Do'

    buttonAgree.onclick = function () { editToDo(oldToDoName) }

    popupContentButtons.appendChild(buttonCancel)
    popupContentButtons.appendChild(buttonAgree)
    popupContentElement.prepend(textInput)

    let textInputElement = document.querySelector('#new-todo-name')
        textInputElement.focus()
}
function createPopUpRemoveToDo(param) {
    
    var toDoName = param.parentNode.childNodes[2].value
    
    let text = document.createElement('p')
        text.innerText = 'Confirma a exclusão do to do "' + toDoName + '"?'
    let buttonCancel = document.createElement('button')
        buttonCancel.setAttribute('class', 'btn-cancel')
        buttonCancel.innerText = 'Cancelar'
    let buttonAgree = document.createElement('button')
        buttonAgree.setAttribute('id', 'agree')
        buttonAgree.innerText = 'Remover To Do'
    
    buttonAgree.onclick = function () { removeToDo(toDoName) }
    
    popupContentButtons.appendChild(buttonCancel)
    popupContentButtons.appendChild(buttonAgree)
    popupContentElement.prepend(text)
}

function createPopUpSendMessage(message) {
    
    let text = document.createElement('p')
        text.innerText = message
    let buttonAgree = document.createElement('button')
        buttonAgree.setAttribute('id', 'agree')
        buttonAgree.innerText = 'Ok'

    buttonAgree.onclick = function () { clearPopUp() }
    
    popupContentButtons.appendChild(buttonAgree)
    popupContentElement.prepend(text)
}