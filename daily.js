const dailyForm = document.querySelector(".dailyForm"),
  dailyInput = dailyForm.querySelector("input"),
  dailyList = document.querySelector(".check");

const DAILY_LS = "dailyToDos";
const DONE_LS = "saveDone";

let dailyToDos = [];
let idNumbers = 1;

function display(clicked) {
  const checkId = clicked.target.parentNode;
  const checkIdInt = checkId.id;
  const checkIdInLi = checkIdInt - 1;
  console.log(dailyToDos[checkIdInLi], checkId);
  if (dailyToDos[checkIdInLi].done === "noOff") {
    checkId.classList = "off";
    dailyToDos[checkIdInLi].done = "yesOn";
    const cleanDailyToDos = dailyToDos.filter(function (dailyToDo) {
      return dailyToDo.id !== parseInt(checkIdInLi.id);
    });
    dailyToDos = cleanDailyToDos;
    console.log(dailyToDos, "dailyToDos clicked if off made to on");
    saveDailyToDos();
  } else {
    checkId.classList = "on";
    dailyToDos[checkIdInLi].done = "noOff";
    const cleanDailyToDos = dailyToDos.filter(function (dailyToDo) {
      return dailyToDo.id !== parseInt(checkIdInLi.id);
    });

    dailyToDos = cleanDailyToDos;
    console.log(dailyToDos, "dailyToDos clicked else made to off");
    saveDailyToDos();
  }
  console.log(checkIdInt);
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
  //const newIdForClass = newId - 1;
  console.log(newId, "newId");
  /* dailyToDoLi.classList.add("off");
   */

  if (done === "noOff") {
    dailyToDoLi.classList.add("on");
    //done = "yesOn";
  } else {
    dailyToDoLi.classList.add("off");
    //done = "noOff";
  }

  dailyList.appendChild(dailyToDoLi);
  /* aHref.setAttribute("onclick", `display(${newId})`); */
  aHref.addEventListener("click", display);
  const dailyToDoObj = {
    text: text,
    id: newId,
    done: done,
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
  const loadedDone = localStorage.getItem(DONE_LS);
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
  console.log(dailyToDos);
}

init();
