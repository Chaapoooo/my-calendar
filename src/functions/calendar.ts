
export function updateCalendar() {
  let year = 2026
  let month = 9
  let currentDate = new Date(year, month, 1)
  let daysInMonth = new Date(year, month + 1, 0).getDate()
  let monthBeginOffset = currentDate.getDay() === 0 ? 6 : (currentDate.getDay() + 6) % 7
  const daysContainer = document.querySelector<HTMLDivElement>('#days')!;

  for (let i = 0; i < monthBeginOffset; i++) {
    const emptyDay = document.createElement('div');
    emptyDay.classList.add('day');
    daysContainer.append(emptyDay);
  }
  
  for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = document.createElement('div');
    dayElement.classList.add('day');
    dayElement.textContent = day.toString();
    daysContainer.append(dayElement);
  }
}

function getMonthVerbose(){
    let currentDate = new Date().getMonth();
    
    if (currentDate == 0) {return "January";}
    else if (currentDate == 1) {return "February";}
    else if (currentDate == 2) {return "March";}
    else if (currentDate == 3) {return "April";}
    else if (currentDate == 4) {return "May";}
    else if (currentDate == 5) {return "June";}
    else if (currentDate == 6) {return "July";}
    else if (currentDate == 7) {return "August";}
    else if (currentDate == 8) {return "September";}
    else if (currentDate == 9) {return "October";}
    else if (currentDate == 10) {return "November";}
    else if (currentDate == 11) {return "December";}
    else {
        console.error("Error: Invalid month value.");
        return "Err";
    }
}
export function outputCurrentMonthAndYear() {
    let currentDate = new Date();
    let currentMonth = getMonthVerbose();
    let currentYear = currentDate.getFullYear();
    
    const monthElement = document.querySelector<HTMLDivElement>('#currentMonth')!;
    const yearElement = document.querySelector<HTMLDivElement>('#currentYear')!;
    
    monthElement.textContent = currentMonth;
    yearElement.textContent = currentYear.toString();
}