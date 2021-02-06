const dailyForm = document.querySelector(".dailyForm"),
  dailyInput = dailyForm.querySelector("input"),
  dailyList = document.querySelector(".check");

const DAILY_LS = "dailyToDos";

let dailyToDos = [];
let idNumbers = 1;

function display(clicked) {
  const checkId = clicked.target.parentNode;
  const checkIdInt = checkId.id - 1;

  const checkDone = checkIdInt.done;
  if (checkId.classList == "off") {
    checkId.classList = "on";
  } else {
    checkId.classList = "off";
  }
  saveDailyToDos();
}

function deleteDailyToDos(event) {
  const dlyBtn = event.target;
  const dailyLi = dlyBtn.parentNode;
  dailyList.removeChild(dailyLi);
  const cleanDailyToDos = dailyToDos.filter(function (dailyToDo) {
    return dailyToDo.id !== parseInt(dailyLi.id);
  });

  dailyToDos = cleanDailyToDos;
  saveDailyToDos();
}

function saveDailyToDos() {
  localStorage.setItem(DAILY_LS, JSON.stringify(dailyToDos));
}

function paintDailyToDos(text, done) {
  const dailyToDoLi = document.createElement("li");
  const aHref = document.createElement("a");
  aHref.setAttribute("href", "javascript:void(0);");
  aHref.classList.add("icon");
  const dailyDeleteBtn = document.createElement("button");
  dailyDeleteBtn.className = "deleteDaily";
  /*const newId = dailyToDos.length + 1;*/
  const newId = idNumbers;
  idNumbers += 1;
  dailyDeleteBtn.addEventListener("click", deleteDailyToDos);
  dailyDeleteBtn.innerText = "✕";
  aHref.innerText = text;
  dailyToDoLi.appendChild(aHref);
  /* 온클릭이벤트 전달안됨
  aHref.onclick = `display(${newId})`;*/
  dailyToDoLi.appendChild(dailyDeleteBtn);
  dailyToDoLi.id = newId;
  dailyToDoLi.classList.add("off");
  dailyList.appendChild(dailyToDoLi);
  /* aHref.setAttribute("onclick", `display(${newId})`); */
  aHref.addEventListener("click", display);
  const dailyToDoObj = {
    text: text,
    id: newId,
    done: "no",
  };
  dailyToDos.push(dailyToDoObj);
  saveDailyToDos();
}

function handleDailySubmit(event) {
  event.preventDefault();
  const currentDailyValue = dailyInput.value;
  paintDailyToDos(currentDailyValue);
  dailyInput.value = "";
}

function loadDailyToDos() {
  const loadedDailyToDos = localStorage.getItem(DAILY_LS);
  if (loadedDailyToDos !== null) {
    const parsedDailyToDos = JSON.parse(loadedDailyToDos);
    parsedDailyToDos.forEach(function (dailyToDo) {
      paintDailyToDos(dailyToDo.text, dailyToDo.done);
    });
  }
}

function init() {
  loadDailyToDos();
  dailyForm.addEventListener("submit", handleDailySubmit);
}

init();
