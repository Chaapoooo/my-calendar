import './style.css'
import {outputCurrentMonthAndYear, moveMonth, refreshCalendar} from './functions/calendar'
import {addEvent} from './functions/events'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<section id="center">
  <div>
    <h1>My Calendar</h1>
  </div>
<div>
  <div>
    <div id="currentMonth">temp</div>
    <div id="currentYear">temp</div>
  </div>
  <div>
    <button id="previousMonth"> << </button>
    <button id="goToCurrentMonth">Current Month</button>
    <button id="nextMonth"> >> </button>
  </div>
</div>

<div id="weekdays">
  <div class="weekday">Mon</div>
  <div class="weekday">Tue</div>
  <div class="weekday">Wed</div>
  <div class="weekday">Thu</div>
  <div class="weekday">Fri</div>
  <div class="weekday">Sat</div>
  <div class="weekday">Sun</div>
</div>
<div id="days"></div>
</section>
<dialog id="eventsDialog">
  <form>
    <div>
      <label for="eventTitle">Title :</label>
      <input type="text" id="eventTitle" name="title" required>
      <input type="text" id="eventTime" name="time" placeholder="HH:mm" pattern="([01][0-9]|2[0-3]):[0-5][0-9]" maxlength=5 minlength=5>
      <input type="text" id="eventDescription" name="description">
    </div>
  
  <div id="dialogEvents"></div>
    
    <div class="buttons">
      <button type="submit" value="save">Save</button>
      <button type="button" id="closeDialog" value="cancel">Cancel</button>
    </div>
  </form>
</dialog>
`

let form = document.querySelector<HTMLFormElement>('#eventsDialog form')!;
let time = document.querySelector<HTMLInputElement>('#eventTime')!;
let description = document.querySelector<HTMLInputElement>('#eventDescription')!;
time.addEventListener('input', (event) => {
  if(time.value.length==2 && event.inputType == 'insertText'){
    time.value = time.value.toString() + ':'
  }
})

form.addEventListener('submit', (event) => {
  event.preventDefault();
  let content = eventTitle.value.trim();
  let date = dialog.dataset.date!;
  if (content && date && description){
    addEvent(content, date, time.value, description.value);
  } else if(content && date){
    addEvent(content, date, time.value);
  } else {
    addEvent(content, date);
  }
  dialog.close();
  refreshCalendar();
  eventTitle.value = '';
  time.value = '';
})

let eventTitle = document.querySelector<HTMLInputElement>('#eventTitle')!;
let dialog = document.querySelector<HTMLDialogElement>('#eventsDialog')!;
dialog.addEventListener('close', () => {
  eventTitle.value = '';
  time.value = '';
})

let closeDialog = document.querySelector<HTMLButtonElement>('#closeDialog')!;
closeDialog.addEventListener('click', () => {
  dialog.close();
  form.reset();
})

let previousMonthButton = document.querySelector<HTMLButtonElement>('#previousMonth')!;
let nextMonthButton = document.querySelector<HTMLButtonElement>('#nextMonth')!;
let goToCurrentMonthButton = document.querySelector<HTMLButtonElement>('#goToCurrentMonth')!;

goToCurrentMonthButton.addEventListener('click', () => {
  moveMonth('current');
});

previousMonthButton.addEventListener('click', () => {
  moveMonth('previous');
});

nextMonthButton.addEventListener('click', () => {
  moveMonth('next');
});

outputCurrentMonthAndYear(new Date().getMonth(), new Date().getFullYear())
refreshCalendar();
