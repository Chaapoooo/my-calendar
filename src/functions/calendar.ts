import {loadEvents, showEventsDialogForDate} from './events'

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

export function moveMonth(direction: 'previous' | 'current' | 'next') {
  if (direction === 'previous') {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
  } else if (direction === 'next') {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
  } else if (direction === 'current') {
    currentMonth = new Date().getMonth();
    currentYear = new Date().getFullYear();
  }

  outputCurrentMonthAndYear(currentMonth, currentYear);
  updateCalendar(currentMonth, currentYear);
}

export function updateCalendar(month: number, year: number) {
  let currentDate = new Date(year, month, 1)
  let daysInMonth = new Date(year, month + 1, 0).getDate()
  let monthBeginOffset = currentDate.getDay() === 0 ? 6 : (currentDate.getDay() + 6) % 7
  const daysContainer = document.querySelector<HTMLDivElement>('#days')!;

  daysContainer.innerHTML = '';

  for (let i = 0; i < monthBeginOffset; i++) {
    const emptyDay = document.createElement('div');
    emptyDay.classList.add('day');
    emptyDay.classList.add('empty');
    daysContainer.append(emptyDay);
  }
  
  let eventList = loadEvents();

  for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = document.createElement('div');
    let dataset = dayElement.dataset;
    dataset.date = `${year}-${(month+1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    dayElement.addEventListener('click', () => {
      if (!dataset.date) {
        return;
      }
      const eventsDialog = document.querySelector<HTMLDialogElement>('#eventsDialog')!;
      eventsDialog.dataset.date = dataset.date;
      showEventsDialogForDate(eventsDialog.dataset.date);
      eventsDialog.showModal();
    });
    dayElement.classList.add('day');
    if (isToday(day, month, year)) {
      dayElement.classList.add('today');
    }

    let dayNumber = document.createElement('div')
    dayNumber.classList.add('number')
    dayNumber.textContent = day.toString();
    dayElement.appendChild(dayNumber)

    for (let i = 0; i < eventList.length; i++) {
      if(eventList[i].date === dataset.date){
        dayElement.classList.add('has-event')
        let dayEvent = document.createElement('div')
        dayEvent.classList.add('event')
        dayElement.appendChild(dayEvent)
        dayEvent.textContent = eventList[i].title
      }
    }
    
    daysContainer.append(dayElement);
  }
}

function getMonthVerbose(month: number){    
    if (month == 0) {return "January";}
    else if (month == 1) {return "February";}
    else if (month == 2) {return "March";}
    else if (month == 3) {return "April";}
    else if (month == 4) {return "May";}
    else if (month == 5) {return "June";}
    else if (month == 6) {return "July";}
    else if (month == 7) {return "August";}
    else if (month == 8) {return "September";}
    else if (month == 9) {return "October";}
    else if (month == 10) {return "November";}
    else if (month == 11) {return "December";}
    else {
        console.error("Error: Invalid month value.");
        return "Err";
    }
}

export function outputCurrentMonthAndYear(month: number,year: number) {
    let getMonth = getMonthVerbose(month);
    
    const monthElement = document.querySelector<HTMLDivElement>('#currentMonth')!;
    const yearElement = document.querySelector<HTMLDivElement>('#currentYear')!;
    
    monthElement.textContent = getMonth;
    yearElement.textContent = year.toString();
}

export function isToday(day: number, currentMonth: number, currentYear: number) {
    const today = new Date();

    return (
        today.getFullYear() === currentYear &&
        today.getMonth() === currentMonth &&
        today.getDate() === day
    );
}

export function refreshCalendar(){
  updateCalendar(currentMonth, currentYear);
}