const dateContainer = document.querySelector(".etc"),
  dateTitle = dateContainer.querySelector(".date"),
  dateTimeTitle = dateContainer.querySelector(".time");

function getDate() {
  const month = new Array();
  month[0] = "Jan.";
  month[1] = "Feb.";
  month[2] = "Mar.";
  month[3] = "Apr.";
  month[4] = "May";
  month[5] = "Jun.";
  month[6] = "Jul.";
  month[7] = "Aug.";
  month[8] = "Sep.";
  month[9] = "Oct.";
  month[10] = "Nov.";
  month[11] = "Dec.";
  const date = new Date();
  const uhr = date.getHours();
  const minute = date.getMinutes();
  const sekund = date.getSeconds();
  const datum = date.getDate();
  const monat = month[date.getMonth()];
  const jahr = date.getFullYear();
  dateTitle.innerText = `${datum} ${monat} ${jahr}`;
  dateTimeTitle.innerText = `${uhr < 10 ? `0${uhr}` : uhr}:${
    minute < 10 ? `0${minute}` : minute
  }:${sekund < 10 ? `0${sekund}` : sekund}`;
}

function init() {
  getDate();
  setInterval(getDate, 1000);
}

init();
