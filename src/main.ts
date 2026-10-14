import './style.css'
import {updateCalendar, outputCurrentMonthAndYear, moveMonth} from './functions/calendar'
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
      <label for="eventTitle">Titre :</label>
      <input type="text" id="eventTitle" name="title" required>
    </div>
    
    <div class="buttons">
      <button type="submit" value="save">Save</button>
      <button type="button" id="closeDialog" value="cancel">Cancel</button>
    </div>
  </form>
</dialog>
`

let form = document.querySelector<HTMLFormElement>('#eventsDialog form')!;
form.addEventListener('submit', (event) => {
  event.preventDefault();
  let content = eventTitle.value.trim();
  let date = dialog.dataset.date;
  if (content && date){
    addEvent(content, date);
    dialog.close();
  }
})
let eventTitle = document.querySelector<HTMLInputElement>('#eventTitle')!;
let dialog = document.querySelector<HTMLDialogElement>('#eventsDialog')!;





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
updateCalendar(new Date().getMonth(), new Date().getFullYear())
