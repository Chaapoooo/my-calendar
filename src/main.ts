import './style.css'
import {updateCalendar, outputCurrentMonthAndYear, moveMonth} from './functions/calendar'

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
`
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