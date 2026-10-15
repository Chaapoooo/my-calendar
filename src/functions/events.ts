
export type CalendarEvent = {id: string, title: string,date: string}

export function saveEvents(events: CalendarEvent[]){
    let stringEvents = JSON.stringify(events)
    localStorage.setItem('events', stringEvents)
}

export function loadEvents(): CalendarEvent[]{
    let stringEvents = localStorage.getItem('events')
    if(stringEvents){
        let events: CalendarEvent[] = JSON.parse(stringEvents)
        return events
    }
    return []
}

export function addEvent(title: string, date: string){
    let events = loadEvents()
    let event: CalendarEvent = {id: crypto.randomUUID(), title, date}
    events.push(event)
    saveEvents(events)
}

export function showEventsDialogForDate(date: string, events = loadEvents()){
    const dialogEvents = document.querySelector<HTMLDivElement>('#dialogEvents')!;
    dialogEvents.innerHTML = ``
    for(let i=0; i<events.length; i++){
        if (events[i].date === date){
            let dayEventDialog = document.createElement('div')
            dayEventDialog.classList.add('dialogEvent')
            dialogEvents.appendChild(dayEventDialog)
            dayEventDialog.textContent = events[i].title
        }
    }
}