import {refreshCalendar} from "./calendar.ts";

export type CalendarEvent = {id: string, title: string,date: string, time?: string}

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

export function addEvent(title: string, date: string, time?: string){
    let events = loadEvents()
    let event: CalendarEvent = {id: crypto.randomUUID(), title, date, time}
    events.push(event)
    saveEvents(events)
}

export function showEventsDialogForDate(date: string, events = loadEvents()){
    const dialogEvents = document.querySelector<HTMLDivElement>('#dialogEvents')
    dialogEvents!.innerHTML = ``

    for(let i=0; i<events.length; i++){
        let deleteEventButton = document.createElement('button');
        deleteEventButton.classList.add('deleteEventButton');
        deleteEventButton.textContent = '🗑️';
        deleteEventButton.type = 'button';

        deleteEventButton.addEventListener('click', (event) => {
            let eventId = events[i].id;
            event.preventDefault();
            deleteEvent(eventId.toString())
            showEventsDialogForDate(date)
            refreshCalendar()
        })

        let editEventButton = document.createElement('button');
        editEventButton.classList.add('editEventButton');
        editEventButton.textContent = '✏️';
        editEventButton.type = 'button';

        if (events[i].date === date){
            let dayEventDialog = document.createElement('div')
            dayEventDialog.classList.add('dialogEvent')
            dialogEvents!.appendChild(dayEventDialog)
            dialogEvents!.appendChild(editEventButton)
            dialogEvents!.appendChild(deleteEventButton)
            if (events[i].time){
                dayEventDialog.textContent = `${events[i].title} ${events[i].time}`
            }
            else {
                dayEventDialog.textContent = `${events[i].title}`;
            }

            editEventButton.addEventListener('click', () => {
                let titleModif = document.createElement('input');
                titleModif.type = 'text';
                titleModif.value = events[i].title;
                let timeModif = document.createElement('input');
                timeModif.type = 'text';
                timeModif.value = events[i].time ?? '';
                let dateModif = document.createElement('input');
                dateModif.type = 'date';
                dateModif.value = events[i].date;

                let editContainer = document.createElement('div');
                editContainer.classList.add('editContainer');
                editContainer.appendChild(titleModif);
                editContainer.appendChild(timeModif);
                editContainer.appendChild(dateModif);

                dayEventDialog.replaceWith(editContainer);

                let saveEventButton = document.createElement('button');
                saveEventButton.classList.add('saveEventButton');
                saveEventButton.textContent = "Save";
                saveEventButton.type = 'button';
                saveEventButton.addEventListener('click', () => {
                    if(titleModif.value.trim() && timeModif.value){
                        updateEvent(events[i].id, titleModif.value.trim(), timeModif.value, dateModif.value);
                        refreshCalendar();
                        showEventsDialogForDate(date)
                    }
                })
                editContainer.appendChild(saveEventButton)

                let cancelEventButton = document.createElement('button');
                cancelEventButton.classList.add('cancelEventButton');
                cancelEventButton.textContent = 'Cancel';
                cancelEventButton.type = 'button';
                editContainer.appendChild(cancelEventButton)
                cancelEventButton.addEventListener('click', () => {
                    showEventsDialogForDate(date);
                    editEventButton.removeEventListener('click', () => {})
                })
                /*updateEvent(eventId.toString(), events[i].title, events[i].time!, events[i].date);*/
            })
        }
    }
}

export function deleteEvent(id: string){
    let listOfEvents = loadEvents()
    let notDeletedEvents = listOfEvents.filter(event => event.id !== id)
    saveEvents(notDeletedEvents)
    loadEvents()
}

export function updateEvent(id: string, title: string, time: string, date?: string){
    let listOfEvents = loadEvents()
    for (let i = 0; i < listOfEvents.length; i++){
        if(listOfEvents[i].id === id && title && time && date) {
            listOfEvents[i].title = title
            listOfEvents[i].time = time
            listOfEvents[i].date = date
            saveEvents(listOfEvents)
            return;
        } else if(listOfEvents[i].id === id && title && time) {
            listOfEvents[i].title = title
            listOfEvents[i].time = time
            saveEvents(listOfEvents)
            return;
        }
    }
    console.error("ERROR, can't update event");
}