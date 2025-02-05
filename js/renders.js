function renderLists() {

    if (!todos.length) {
        listsElement.innerHTML = "Você ainda não possuí nenhuma lista.";
    } else {
        listsElement.innerHTML = "";
        createListsRender();
    }

    var createListElement = document.querySelector(
        "#lists-space .create-new-list"
    );
    
    createListElement.onclick = function () {
        createPopUpsManager("addList", null);
    };

    var listElement = document.querySelectorAll(".list");
    listElement.forEach((list) => {
        list.onclick = function (event) {
            showToDosList(event.target);
        };
        list.childNodes[0].value === currentList && activeList(list);
    });
}

function renderToDos(list) {
    if (list === undefined) {
        return;
    } else {
        currentList = list.name;

        !list.todo.length && !list.done.length
            ? (todosListElement.innerHTML =
                  "Você ainda não possui nenhum to do.")
            : (todosListElement.innerText = "");

        var listElement = document.querySelectorAll(".list");
        listElement.forEach((listElem) => {
            listElem.childNodes[0].value === currentList &&
                activeList(listElem);
        });

        let listNameElementHeader = document.querySelector(
            "#todos-space > header"
        );
        let listNameElement = document.querySelector("#todos-space #list-name");
        listNameElement.innerText = currentList;
        listNameElementHeader.style.display === "" &&
            elementVisibility(listNameElementHeader);

        let addTodoSpace = document.querySelector("#todos-space > footer");
        addTodoSpace.style.display === "" && elementVisibility(addTodoSpace);

        let buttonAddNewTodo = document.querySelector("#add-new-todo");
        buttonAddNewTodo.onclick = function () {
            addTodo();
        };

        let newTodoTextElement = document.querySelector("#new-todo-text");
        newTodoTextElement.onkeydown = function (event) {
            event.keyCode === 13 && addTodo();
        };

        createToDosRender(list.todo, "todo");
        createToDosRender(list.done, "done");

        document.body.offsetWidth < 800 && closeLists();
    }
}
