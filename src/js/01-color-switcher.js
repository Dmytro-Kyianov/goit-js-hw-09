const startBtnEl = document.querySelector('button[data-start]');
const stopBtnEl = document.querySelector('button[data-stop]');

startBtnEl.addEventListener('click', onStartBtnClick);
stopBtnEl.addEventListener('click', onStopBtnClick);

let intervalId = null;

function onStartBtnClick () {
    stopBtnEl.disabled = false;
    startBtnEl.disabled = true;
    intervalId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();}, 1000)
}

function onStopBtnClick () {
    startBtnEl.disabled = false;
    stopBtnEl.disabled = true;
    clearInterval(intervalId);
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}