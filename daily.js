const dailyForm = document.querySelector(".dailyForm"),
  dailyInput = dailyForm.querySelector("input"),
  dailyList = document.querySelector(".check");

const DAILY_LS = "dailyToDos";
const DONE_LS = "saveDone";

let dailyToDos = [];
let idNumbers = 1;
let saveDone = [];

function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

function display(clicked) {
  const checkId = clicked.target.parentNode;
  const checkIdInt = checkId.id;
  // saveDone.includes(checkIdInt)); //true
  typeof checkIdInt;
  console.log(checkIdInt, saveDone.toString(checkIdInt));
  if (saveDone.includes(checkIdInt) == false) {
    checkId.classList = "on";
    saveDone.push(checkIdInt);
    /* const cleanDones = saveDone.filter(function (dailyToDo) {
      return saveDone.id !== parseInt(checkIdInt);
    });
    saveDone = cleanDones;*/
    saveCheckedDone();
  } else {
    checkId.classList = "off";
    removeItemOnce(saveDone, checkIdInt);
    saveCheckedDone();
  }
  console.log(saveDone);
  console.log(checkIdInt);
}

function saveCheckedDone() {
  localStorage.setItem(DONE_LS, JSON.stringify(saveDone));
  console.log(saveDone);
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

function paintDailyToDos(text) {
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
  console.log(newId);
  /* dailyToDoLi.classList.add("off");
   */
  if (saveDone.includes(newId - 1) == false) {
    dailyToDoLi.classList.add("off");
  } else {
    dailyToDoLi.classList.add("on");
  }

  dailyList.appendChild(dailyToDoLi);
  /* aHref.setAttribute("onclick", `display(${newId})`); */
  aHref.addEventListener("click", display);
  const dailyToDoObj = {
    text: text,
    id: newId,
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
      paintDailyToDos(dailyToDo.text);
    });
  }
}

function init() {
  loadDailyToDos();
  dailyForm.addEventListener("submit", handleDailySubmit);
  console.log(saveDone);
}

init();
