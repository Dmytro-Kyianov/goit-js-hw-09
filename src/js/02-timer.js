import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtnEl = document.querySelector('button[data-start]');
const inputEl = document.querySelector('input');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
    if(selectedDates[0] < Date.now()) {  
        return Notiflix.Notify.failure('Please choose a date in the future',
            { position: 'center-top', });}
      startBtnEl.disabled = false;
      inputEl.disabled = true;
  },
};

const fp = flatpickr(inputEl, options);

startBtnEl.disabled = true;

class Timer {
  constructor({ onTick }) {
    this.intervalId = null;
    this.onTick = onTick;
    }
     start() {
    const targetDate = fp.selectedDates[0];

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = targetDate - currentTime;
      const time = this.convertMs(deltaTime);

      this.onTick(time);

      if (deltaTime < 1000) {
        clearInterval(this.intervalId);
        inputEl.disabled = false;}}, 1000);
    }

    convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = this.addLeadingZero(Math.floor(ms / day));
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = this.addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = this.addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  }

    addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
}

const timer = new Timer({
  onTick: updateMarkup,
});

startBtnEl.addEventListener('click', onStartBtnClick)

function onStartBtnClick () {
  startBtnEl.disabled = true;
  inputEl.disabled = true;
  timer.start.bind(timer)();
}

function updateMarkup({ days, hours, minutes, seconds }) {
  daysEl.textContent = `${days}`;
  hoursEl.textContent = `${hours}`;
  minutesEl.textContent = `${minutes}`;
  secondsEl.textContent = `${seconds}`;
}
 
