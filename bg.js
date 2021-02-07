const body = document.querySelector("body");

const IMG_NUMBER = 4;

const IMG_SHOWING = "showing";
const IMG_NOT_SHOWING = "form";

function paintImage(imgNumber) {
  const image = new Image();
  image.src = `images/${imgNumber + 1}.jpg`;
  image.classList.add("bgImage");
  image.classList.add(IMG_NOT_SHOWING);

  function handleImgLoad() {
    console.log("finished loading");
    image.classList.remove(IMG_NOT_SHOWING);
    image.classList.add(IMG_SHOWING);
  }

  body.prepend(image);
  image.addEventListener("load", handleImgLoad);
}

function genRandom() {
  const number = Math.floor(Math.random() * 4);
  return number;
}

function init() {
  const randomNamber = genRandom();
  paintImage(randomNamber);
}

init();
