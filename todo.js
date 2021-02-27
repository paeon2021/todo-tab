const todoForm = document.querySelector(".todoForm"),
  todoInput = todoForm.querySelector("input"),
  todoList = document.querySelector(".todo");

const TODOS_LS = "toDos";

let toDos = [];
let todoidNumbers = 1;

function displayToDo(clicked) {
  const checkId = clicked.target.parentNode;
  const checkIdInt = checkId.id;
  const checkIdInLi = checkIdInt - 1;
  console.log(toDos[checkIdInLi], checkId);
  if (toDos[checkIdInLi].done === "yesDone") {
    checkId.classList = "off";
    toDos[checkIdInLi].done = "notDone";
    const cleanToDos = toDos.filter(function (toDo) {
      return toDo.id !== parseInt(checkIdInLi.id);
    });
    toDos = cleanToDos;
    console.log(toDos, "toDos clicked if off made to on");
    saveToDos();
  } else {
    checkId.classList = "on";
    toDos[checkIdInLi].done = "yesDone";
    const cleanToDos = toDos.filter(function (toDo) {
      return toDo.id !== parseInt(checkIdInLi.id);
    });

    toDos = cleanToDos;
    console.log(toDos, "toDos clicked else made to off");
    saveToDos();
  }
  console.log(checkIdInt);
}

function deleteToDo(event) {
  const deletebtn = event.target;
  const li = deletebtn.parentNode;
  todoList.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    console.log(toDo.id, li.id);
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text, done) {
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.setAttribute("href", "javascript:void(0);");
  li.classList.add("to-do-link");
  const delBtn = document.createElement("button");
  delBtn.className = "deleteToDo";
  /*const newId = toDos.length + 1;*/
  const todoId = todoidNumbers;
  todoidNumbers += 1;
  delBtn.addEventListener("click", deleteToDo);
  delBtn.innerText = " X ";
  a.innerText = text;
  li.appendChild(a);
  li.appendChild(delBtn);

  li.id = todoId;

  if (done === "yesDone") {
    li.classList.add("on");
    //done = "notDone";
  } else {
    li.classList.add("off");
    //done = "yesDone";
  }

  todoList.appendChild(li);

  a.addEventListener("click", displayToDo);

  const toDoObj = {
    text: text,
    id: todoId,
    done: done,
  };
  console.log(toDoObj);
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = todoInput.value;
  paintToDo(currentValue);
  todoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text, toDo.done);
    });
  }
}

function init() {
  loadToDos();
  todoForm.addEventListener("submit", handleSubmit);
}

init();
