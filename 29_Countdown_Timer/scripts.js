let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const timerEnd = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);
  countdown = setInterval(()=>{
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if(secondsLeft <0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000)
}

function displayTimeLeft(seconds){
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor(seconds / 60) - (hours * 60);
  const leftSeconds = seconds % 60 ;
  const display = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0': ''}${minutes}:${leftSeconds < 10 ? '0' : ''}${leftSeconds}`;
  timerDisplay.textContent = display;
  document.title = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  const minutes = end.getMinutes();
  timerEnd.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTime() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach( button => button.addEventListener('click', startTime));
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  this.reset();
  timer(mins * 60);
});