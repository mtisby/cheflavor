import { sortDates, stringtoDate } from "../scripts/modifyDates.js"

let eventsToDisplay = 10;
let datesObj = {}

// import from events.ejs
const confirmedEvents = JSON.parse(eventsObj);
// console.log(confirmedEvents)

for (var n = 0; n < confirmedEvents.length; n++) {
    if (confirmedEvents[n].dateSelected.length > 10 && new Date(confirmedEvents[n].dateSelected).getTime() > new Date().getTime()) {
        //console.log(typeof confirmedEvents[n].dateSelected)
        let dateString = confirmedEvents[n].dateSelected
        let newdate = stringtoDate(dateString)
        
        datesObj[newdate] = confirmedEvents[n];
        // console.log(newlist)
        // console.log('hello', date-today)
    }
}

let arrToSort = Object.keys(datesObj)
let sorted = sortDates(arrToSort)

// select div container that will contain all displayed events
const eventsContainer = document.querySelector('#upcomingEvents');
for (var i = 0; i < eventsToDisplay; i++) {
    const currentObj = datesObj[sorted[i]]

    const eventDiv = document.createElement('div');
    const header = document.createElement('h1');
    header.innerHTML = currentObj.dateSelected;
    const p = document.createElement('p');
    p.innerHTML = `event with ${currentObj.firstName} ${currentObj.lastName} starting at ${currentObj.timeSelected}`


    eventDiv.appendChild(header);
    eventDiv.appendChild(p);
    eventsContainer.appendChild(eventDiv)
}