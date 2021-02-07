//selector
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOptions = document.querySelector(".filter-todo");


//event
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOptions.addEventListener('click', filterTodo);


//function
function addTodo(event) {
    //
    event.preventDefault();
    //todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");
    //create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //add todo to ls
    saveLocalTodo(todoInput.value);
    //check mark btn
    const complitedBtn = document.createElement('button');
    complitedBtn.innerHTML = '<i class="fas fa-check"></i>';
    complitedBtn.classList.add("complete-btn");
    todoDiv.appendChild(complitedBtn);
    //check del btn
    const deletedBtn = document.createElement('button');
    deletedBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deletedBtn.classList.add("deleted-btn1");
    todoDiv.appendChild(deletedBtn);
    //append list
    todoList.appendChild(todoDiv);
    //del todo input val
    todoInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;
    if (item.classList[0] === 'deleted-btn1') {
        const todo = item.parentElement;
        //anination
        todo.classList.add("deletedbtn");
        deleteLocalTodos(todo)
        todo.addEventListener('transitionend', function () {
            todo.remove();
        });

    }
    // check marks
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle("completebtn");
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = " flex";
                break;
            case "completed":
                if (todo.classList.contains("completebtn")) {
                    todo.style.display = "flex";

                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completebtn")) {
                    todo.style.display = " flex";
                } else {
                    todo.style.display = "none";
                }
                break;

        }
    });

}

///LocalStorage

function saveLocalTodo(todo) {
    //check local
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    //check local
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function (todos) {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");
        //create li
        const newTodo = document.createElement('li');
        newTodo.innerText = todos;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        //check mark btn
        const complitedBtn = document.createElement('button');
        complitedBtn.innerHTML = '<i class="fas fa-check"></i>';
        complitedBtn.classList.add("complete-btn");
        todoDiv.appendChild(complitedBtn);
        //check del btn
        const deletedBtn = document.createElement('button');
        deletedBtn.innerHTML = '<i class="fas fa-trash"></i>';
        deletedBtn.classList.add("deleted-btn1");
        todoDiv.appendChild(deletedBtn);
        //append list
        todoList.appendChild(todoDiv);
    });
}

function deleteLocalTodos(todo) {
    //check local
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos",JSON.stringify(todos));
}











