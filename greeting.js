const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
  SHOWING_ON = "showing";

const HELLO_ARRAY = [
  "안녕",
  "알로하",
  "헬로",
  "Hello",
  "Hallo",
  "Hola",
  "G'day",
  "Aloha",
  "Χαιρε",
  "Salut",
  "Ciao",
  "Oi",
  "Hoi",
  "Namaste",
  "Merhaba",
  "Salam",
  "Привет",
];
const HELLO_NUMBER = HELLO_ARRAY.length;

const GREETING_ARRAY = [
  "잘 지내?",
  "힘내!",
  "건강하렴!",
  "오늘 괜찮니?",
  "으랏차!",
  "복 받아랏!",
  "영차!",
  "잘 하고 있구나!",
  "stay safe!",
  "may the force be with ya.",
  "g'luck!",
  "cheers!",
  "널 믿어.",
  "차근차근!",
];
const GREETING_NUMBER = GREETING_ARRAY.length;

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
  input.value = "";
}

function askForName() {
  form.classList.add(SHOWING_ON);
  form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
  form.classList.remove(SHOWING_ON);
  greeting.classList.add(SHOWING_ON);
  const randomHelloNumber = Math.floor(Math.random() * HELLO_NUMBER);
  const randomNumber = Math.floor(Math.random() * GREETING_NUMBER);
  greeting.innerText = `${HELLO_ARRAY[randomHelloNumber]}. ${text}, ${GREETING_ARRAY[randomNumber]}`;
  document.title = `안녕. ${text}, ${GREETING_ARRAY[randomNumber]}`;
}

function laodName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  laodName();
}

init();
