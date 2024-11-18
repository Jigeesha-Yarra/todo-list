let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoBtn = document.getElementById("addTodoBtn");
let saveTodoBtn = document.getElementById("saveTodoBtn");

function getTodoListFromLocalStorage(){
    let stringifiedTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedTodoList);
    if(parsedTodoList === null){
        return [];
    }else{
        return parsedTodoList;
    }
}

let todoList = getTodoListFromLocalStorage(); 
let todosCount = todoList.length;

saveTodoBtn.onclick = function(){
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

function addTodoElements(){
    let userInpEl = document.getElementById("todoUserInput");
    let userInpVal = userInpEl.value;

    if(userInpVal === ""){
        alert("Enter Valid Text");
        return;
    }
    todosCount += 1 
    let newTodo = {
        text: userInpVal,
        uniqNo: todosCount,
        isChecked: false
    };
    todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    userInpEl.value = "";
}

addTodoBtn.onclick = function(){
    addTodoElements();
}

function onChangeTodoStatus(checkboxId,labelId, todoId){
    let checkboxEl = document.getElementById(checkboxId);
    let labelEl = document.getElementById(labelId);
    labelEl.classList.toggle("checked");

    let todoObjIndex = todoList.findIndex(function(eachTodo){
        let eachTodoId = "todo" + eachTodo.uniqNo;
        if(eachTodoId === todoId){
            return true;
        }else{
            return false;
        }
    });
    let todoObj = todoList[todoObjIndex];
    if(todoObj.isChecked === true){
        todoObj.isChecked = false;
    }else{
        todoObj.isChecked = true;
    }
}

function deleteTodo(todoId){
    let todoEl = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoEl);
    let deleteElIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqNo;
        if (eachTodoId === todoId){
            return true;
        }else{
            return false;
        }
    });
    todoList.splice(deleteElIndex,1);
}

function createAndAppendTodo(todo) {
    let todoId = "todo" + todo.uniqNo;
    let labelId = "label" + todo.uniqNo;
    let checkboxId = "checkbox" + todo.uniqNo;

  let todoElement = document.createElement("li");
  todoElement.classList.add("todo-item-container");
  todoElement.id = todoId;
  todoItemsContainer.appendChild(todoElement);

  let inputElement = document.createElement("input");
  inputElement.type = "checkbox";
  inputElement.id = checkboxId;
  inputElement.checked = todo.isChecked;

  inputElement.onclick = function(){
    onChangeTodoStatus(checkboxId,labelId, todoId);
  }
  inputElement.classList.add("checkbox-input");
  todoElement.appendChild(inputElement);

  let labelContainer = document.createElement("div");
  labelContainer.classList.add("label-container");
  todoElement.appendChild(labelContainer);

  let labelElement = document.createElement("label");
  labelElement.setAttribute("for", checkboxId);
  labelElement.id = labelId;
  labelElement.classList.add("checkbox-label");
  labelElement.textContent = todo.text;
  if (todo.isChecked == true){
    labelElement.classList.add("checked");
  }
  labelContainer.appendChild(labelElement);

  let deleteIconContainer = document.createElement("div");
  deleteIconContainer.classList.add("delete-icon-container");
  labelContainer.appendChild(deleteIconContainer);

  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
  deleteIcon.onclick = function(){
    deleteTodo(todoId);
  }
  deleteIconContainer.appendChild(deleteIcon);
}

for (let todo of todoList) {
  createAndAppendTodo(todo);
}
