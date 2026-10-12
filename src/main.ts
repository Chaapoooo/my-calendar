import './style.css'
import {updateCalendar, outputCurrentMonthAndYear} from './assets/calendar'

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

outputCurrentMonthAndYear()
updateCalendar()