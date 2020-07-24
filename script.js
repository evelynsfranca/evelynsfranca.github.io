let createCardSpaceElement = document.querySelector('#create-card-space')

let newItemTextElement = document.querySelector('#new-item-text')
    newItemTextElement.onkeydown = (event) => {
        event.keyCode === 13 ? addItem() : false
    }

let addCardElement = document.querySelector('#add-card')
    addCardElement.onclick = (event) => { 
        createCardSpaceElement.style.display === '' ? createCard() : event.preventDefault()
    }

let buttonNewCardAdd = document.querySelector('#add-new-card')
    buttonNewCardAdd.onclick = () => { addCard() }

let buttonNewItemAdd = document.querySelector('#new-item-add')
    buttonNewItemAdd.onclick = () => { addItem() }
    

var todos = JSON.parse(localStorage.getItem('list_todos')) || {}

var firstCard = Object.keys(todos)[0]
var todosSize = Object.keys(todos).length

verifyTodos()

function verifyTodos() {

    let cardTitleElement = document.querySelector('#card-title')
    let cardsListElement = document.querySelector('#cards-list')
    
    var firstCard = Object.keys(todos)[0]
    var todosSize = Object.keys(todos).length

    if(todosSize > 0) {
        renderCardList()
        renderCardItems(todos[firstCard])
        activeCard(cardsListElement.firstChild)
    } else {
        cardsListElement.innerText = 'Você ainda não possui cartões.'
        cardTitleElement.innerText = ''
    }
}
    
function renderCardList() {
    
    let cardsListElement = document.querySelector('#cards-list')
        cardsListElement.innerText = ''

    for(let cardName in todos) {

        var cardSpace = document.createElement('li')
            cardSpace.setAttribute('class', 'card')
        var cardNameSpace = document.createElement('input')
            cardNameSpace.setAttribute('class', 'card-name')
            cardNameSpace.setAttribute('readonly', true)
            cardNameSpace.setAttribute('onclick', 'showCardItems(this)')
            cardNameSpace.value = cardName
        var cardEditButton = document.createElement('button')
            cardEditButton.setAttribute('class', 'card-edit fa fa-pencil-alt')
            cardEditButton.setAttribute('onclick', 'editCardName(this)')
        var cardRemoveButton = document.createElement('button')
            cardRemoveButton.setAttribute('class', 'card-remove fa fa-times')
            cardRemoveButton.setAttribute('onclick', 'messageBox(this, "remove-card")')

        cardSpace.appendChild(cardNameSpace)
        cardSpace.appendChild(cardEditButton)
        cardSpace.appendChild(cardRemoveButton)

        cardsListElement.appendChild(cardSpace)

    }
}

function createCard() {

    let cardsListElement = document.querySelector('#cards-list')
    let cardsListTitleElement = document.querySelector('#cards-space #title')
    var newCardTextElement = document.querySelector('#new-card-text')
    let createCardSpaceElement = document.querySelector('#create-card-space')

    createCardSpaceElement.style.display = 'flex'
    cardsListTitleElement.style.display = 'none'
    cardsListElement.innerText = ''
    newCardTextElement.focus()

    newCardTextElement.onkeydown = (event) => { event.keyCode === 13 ? addCard() : false }  
    newCardTextElement.onblur = (event) => { 
        if(!newCardTextElement.value) {
            event.target.parentNode.style.display = ''
            cardsListTitleElement.style.display = 'block'

            verifyTodos()
        } else {
            addCard()
        }
    }
}

function addCard() {

    let cardsListTitleElement = document.querySelector('#cards-space #title')
    let createCardSpaceElement = document.querySelector('#create-card-space')
    var newCardTextElement = document.querySelector('#new-card-text')
    var cardName = newCardTextElement.value 
    
    if(!cardName) {
        messageBox('Insira um nome para o cartão.', 'add-card')
        
    } else {
        for(let item of Object.keys(todos)) {

            if(item === cardName) {
                messageBox('Já existe cartão com esse nome.', 'add-card')
            }
        }
    }
    todos[cardName] = { title: cardName, items: [], done: []}

    newCardTextElement.value = ''
    createCardSpaceElement.style.display = ''
    cardsListTitleElement.style.display = 'block'


    saveToStorage()
    renderCardList()
    renderCardItems(todos[cardName])
}

function showCardItems(element) {
    let cardName = element.value
    
    activeCard(element.parentNode)
    renderCardItems(todos[cardName])
}

function removeCard(element) {
    let cardName = element.parentNode.childNodes[0].value

    delete todos[cardName]

    saveToStorage()
    verifyTodos()
}

function editCardName(element) {

    activeCard(element.parentNode)
    
    element.removeAttribute('onclick', 'editCardName(this)')
    
    var cardNameElement = element.parentNode.children[0]
    var cardNameContent = element.parentNode.children[0].value
    
    cardNameElement.removeAttribute('readonly')
    cardNameElement.setAttribute('type', 'text')

    cardNameElement.focus()

    cardNameElement.onkeydown = (event) => { 
        if(event.keyCode === 13) {
            editTodoCardName(event.target, cardNameContent)

            cardNameElement.setAttribute('readonly', true) 
            element.setAttribute('onclick', 'editCardName(this)')
        }    
    }
    cardNameElement.onblur = (e) => { 
        e.target.focus()
    } 
}

function editTodoCardName(element, cardNameContent) {

    var newCardName = element.value

    if(cardNameContent === newCardName) {
        return
    } else {
        todos[newCardName] = todos[cardNameContent]
        todos[newCardName].title = newCardName

        delete todos[cardNameContent]
    }

    saveToStorage()
    renderCardList()
    renderCardItems(todos[newCardName])
}

function activeCard(element) {    
    var actives = document.querySelectorAll('.active')

    if(actives.length > 0) {
        disableCards()
        element.classList.add('active')
    } else {
        element.classList.add('active')
    }
}

function disableCards() {
    let actives = document.querySelectorAll('.active')

    actives.forEach(elem => {
        elem.classList.remove('active')
    })
}

// Card items
function renderCardItems(cardList) {

    var cardsListElement = document.querySelector('#cards-list')
    let cardTitleElement = document.querySelector('#card-title')
    let cardListItemsElement = document.querySelector('#items-list')

    cardTitleElement.innerText = ''
    cardListItemsElement.innerHTML = ''

    let todosSize = Object.keys(todos).length

    if(!todosSize) {
        cardsListElement.innerText = 'Você ainda não possui cartões'
        cardListItemsElement.innerText = ''
    } else if(!cardList && !todosSize) {
        cardTitleElement.innerText = ''
        return
    } else if (!cardList && todosSize){              
        cardTitleElement.innerText = firstCard        
        cardList = todos[firstCard]
    } else {
        cardTitleElement.innerText = cardList.title
    }
    
    if(cardList.items.length === 0 && cardList.done.length === 0) {
        cardListItemsElement.innerText = 'Esse cartão ainda não possui itens'
    } else {
        render(cardList)
    }      
}

function render(list) {

    let cardsListElement = document.querySelector('#cards-list')
    let cardListItemsElement = document.querySelector('#items-list')
    let todosSize = Object.keys(todos).length

    !todosSize ? cardsListElement.innerText = 'Você ainda não possui cartões' : false

    for(let item of list.items) {

        let itemSpace = document.createElement('li')
            itemSpace.setAttribute('class', 'item')
        let itemCheck = document.createElement('input')
            itemCheck.setAttribute('type', 'checkbox')
            itemCheck.setAttribute('class', 'item-check')
            itemCheck.setAttribute('onclick', 'checkItem(this)')
        let checkmark = document.createElement('span')
            checkmark.setAttribute('class', 'checkmark')
        let itemNameSpace = document.createElement('div')
            itemNameSpace.setAttribute('class', 'item-text')
            itemNameSpace.innerText = item
        let itemRemoveButton = document.createElement('button')
            itemRemoveButton.setAttribute('class', 'item-remove fa fa-times')
            itemRemoveButton.setAttribute('onclick', 'messageBox(this, "remove-item")')

        itemSpace.appendChild(itemCheck)
        itemSpace.appendChild(checkmark)
        itemSpace.appendChild(itemNameSpace)
        itemSpace.appendChild(itemRemoveButton)

        cardListItemsElement.appendChild(itemSpace)
    }

    for(let done of list.done) {

        let itemSpace = document.createElement('li')
            itemSpace.setAttribute('class', 'item')
        let itemCheck = document.createElement('input')
            itemCheck.setAttribute('type', 'checkbox')
            itemCheck.setAttribute('class', 'item-check')
            itemCheck.setAttribute('onclick', 'checkItem(this)')
            itemCheck.setAttribute('checked', 'checked')
        let checkmark = document.createElement('span')
            checkmark.setAttribute('class', 'checkmark')
        let itemNameSpace = document.createElement('div')
            itemNameSpace.setAttribute('class', 'item-text')
            itemNameSpace.innerText = done
        let itemRemoveButton = document.createElement('button')
            itemRemoveButton.setAttribute('class', 'item-remove fa fa-times')
            itemRemoveButton.setAttribute('onclick', 'messageBox(this, "remove-item")')

        itemSpace.appendChild(itemCheck)
        itemSpace.appendChild(checkmark)
        itemSpace.appendChild(itemNameSpace)
        itemSpace.appendChild(itemRemoveButton)

        cardListItemsElement.appendChild(itemSpace)
    }
}

function addItem() {

    let cardTitleElement = document.querySelector('#card-title')
    let newItemTextElement = document.querySelector('#new-item-text')

    let itemText = newItemTextElement.value
    let todosSize = Object.keys(todos).length
    let cardName = cardTitleElement.innerText

    if(!todosSize) {
        messageBox('Você ainda não possui cartões', 'new-item')
    } else if(!itemText || /^ *$/.test(itemText)) {
        messageBox('Insira um nome para o item', 'new-item')
    } else {
        todos[cardName].items.push(itemText)
        newItemTextElement.value = ''
    }
    
    saveToStorage()
    renderCardItems(todos[cardName])
}


function checkItem(element) {
    let cardTitleElement = document.querySelector('#card-title')    
    let cardListItemsElement = document.querySelector('#items-list')

    let cardName = cardTitleElement.innerText     
    let card = todos[cardName]
    let itemText = element.parentNode.childNodes[2].innerText
    
    let i = card.done.indexOf(itemText)
    let j = card.items.indexOf(itemText)

    if (element.hasAttribute('checked')) {
        element.setAttribute('checked', 'false')
        cardListItemsElement.appendChild(element.parentNode)
        card.done.splice(i, 1)
        card.items.push(itemText)

    } else {
        element.setAttribute('checked', 'checked')
        cardListItemsElement.prepend(element.parentNode)
        card.items.splice(j, 1)
        card.done.push(itemText)
    } 
    
    saveToStorage()
    renderCardItems(card)

}

function removeItem(element) {

    var cardTitleElement = document.querySelector('#card-title')

    var cardName = cardTitleElement.innerText

    let itemName = element.parentNode.childNodes[2].innerText

    let i = todos[cardName].items.indexOf(itemName)
    let j = todos[cardName].done.indexOf(itemName)
    

    if(i >= 0) {
        todos[cardName].items.splice(i, 1)
    } else {
        todos[cardName].done.splice(j, 1)
    }

    saveToStorage()
    renderCardItems(todos[cardName])
}

function saveToStorage() {
    localStorage.setItem('list_todos', JSON.stringify(todos))
}

function messageBox(element, action) {

    var box = document.querySelector('#alerts')
    var options = document.querySelector('#options')
    var message = document.querySelector('#message > p')
    let cancel = document.querySelector('#decline')
    let confirm = document.querySelector('#agree')
    
    
    box.style.display = 'flex'

    if(action === 'remove-item') {

        message.innerText = 'Confirma a exclusão do item?'
        cancel.style.display = 'flex'
        confirm.style.display = 'flex'

        confirm.onclick = () => { 
            box.style.display = 'none'
            removeItem(element)
        }
        box.onclick = () => { 
            box.style.display = 'none'
            return
        }

    } else if(action === 'remove-card') {
        activeCard(element.parentNode)

        message.innerText = 'Confirma a exclusão do cartão?'
        cancel.style.display = 'flex'
        confirm.style.display = 'flex'

        confirm.onclick = () => { 
            box.style.display = 'none'
            removeCard(element)
        }
        box.onclick = () => { 
            box.style.display = 'none'
            return
        }
    } else if(action === 'add-card') { 
        options.style.display = 'none'
        message.style.margin = '15px 0'
        message.innerText = element

        box.onclick = () => { 
            box.style.display = 'none'
        }        
        newCardTextElement.focus()
        return
    } else {
        options.style.display = 'none'
        message.style.margin = '15px 0'
        message.innerText = element

        box.onclick = () => { 
            box.style.display = 'none'
            return
        }
    }
}
