// global variables
const months = {
    Jan: 31, Feb: 28, Mar: 31, April: 30, May: 31, Jun: 30, Jul: 31, Aug: 31,
   Sep: 30, Oct: 31, Nov: 30, Dec: 31
};
const monthsList = Object.keys(months);
const daysOfWeek = [[1, "Sun"], [2, "Mon"], [3, "Tue"],  [4, "Wed"],  [5, "Thu"],  [6, "Fri"],  [7, "Sat"] ]
const daysOfWeekDict = { Sun: 1, Mon: 2, Tue: 3, Wed: 4, Thu: 5, Fri: 6, Sat: 7 };
const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
const today = Date();
const start = 1;
const monthsToShow = 5;
const count = 1;
let year = today.slice(11, 16);

const debugging = true;

// import from ejs file
const confirmedEvents = JSON.parse(eventObj);

// select div container that will contain all displayed calendars
const calendarsContainer = document.querySelector('#calendarContainer');
const popUp = document.querySelector('#popUp');

// quality check 
// check if leap it is a Leap Year
if (parseInt(today.slice(12, 16), 10) % 4 === 0) {
   months[Feb] = 29;
}

// functions 
// function for getting day and month of an event
function getEventDates() {
    let eventDates = []
    for (var eventObjects of confirmedEvents) {
        eventDates.push(eventObjects.dateSelected)
    }

    return eventDates
}

// finding starting index & the date
function startDate(currentDate) {
    const dayInd = daysOfWeekDict[today.slice(0, 3)];
    const dateNum = parseInt(today.slice(8, 10));

    let remainder = dateNum % 7;
    let finalValue = 0;
    
    if ((dayInd - remainder) < 0) {
        const offset = 7;
        finalValue = (dayInd - remainder) + offset;
    } else {
        finalValue = (dayInd - remainder)
    }

    return finalValue;
}
// create and return a list which contains the name of the months to display
function listOfMonths() {
   let currentMonth = today.slice(4, 7);
   let monthsToDisplay = [];

   let countInd = 0;
   for (var month of monthsList) {
       if (month === currentMonth) {
           if (monthsToShow <= 1) {
               monthsToDisplay.push(month);
           } else {
               for (var x = 0; x < monthsToShow; x++) {
                   if (monthsList[countInd + x] === undefined) {
                       countInd = 0;
                       
                       for (var restart = 0; restart < (monthsToShow - x); restart++) {
                           
                           monthsToDisplay.push(monthsList[restart]);
                       }
                       break
                   } else {
                       monthsToDisplay.push(monthsList[countInd + x]);
                   }
                   
               }
           }
       } 
       countInd++;
   }
  
   return monthsToDisplay;
}
// returns an nested array of all of the days within each 
// month that is needed to be displayed. Each nested array is a single month
function listDates(monthsToDisplay) {
   let listOfDates = [];
   for (var i of monthsToDisplay) {
       let addlist = [];
       for (var x = 1; x <= months[i]; x++) {
           addlist.push(x);
       }
       listOfDates.push(addlist);
   }
   return listOfDates;
}

function getNumOfRows(listOfDates, x) {
   let numOfRows = 0;
   if (startInd >= 5) {
       numOfRows = Math.ceil(listOfDates[x][(listOfDates[x]).length - 1] / 7) + 2;
   } else if (monthsToDisplay[x] === 'Feb' && startInd != 1) {
       numOfRows = Math.ceil(listOfDates[x][(listOfDates[x]).length - 1] / 7) + 2;
   }else {
       numOfRows = Math.ceil(listOfDates[x][(listOfDates[x]).length - 1] / 7) + 1;
   }
   return numOfRows
}

function checkEventDates(eventDates, month, cellTextDate, calendarCol, monthsToDisplay) {
    for (var theDay of eventDates) {
        if (theDay.slice(0, 3) === monthsToDisplay[month] && parseInt(theDay.slice(4, 6)) === cellTextDate) {
            calendarCol.classList.add('beforeToday');
        }
        
    }
}

function makeCols(i, calendarRow, counting, startInd, eventDates, month, monthsToDisplay) {
   var newInd = 0
   for (var j = 0; j < 7; j++) {
       const calendarCol = document.createElement('td');
       calendarCol.classList.add('textCenter', 'cellDesign');

       if (i === 1 && j < startInd) {
           //
       } else if ((i === 1 && j >= startInd) || (i > 1 && (counting < listOfDates[x][listOfDates[x].length - 1]))) {
           const cellText = document.createTextNode(listOfDates[x][counting]);
           calendarCol.appendChild(cellText);

           if (listOfDates[x][counting] === parseInt(today.slice(8, 10)) && monthsToDisplay[x] === today.slice(4, 7)) {
               calendarCol.classList.add('today');
           } else if (listOfDates[x][counting] < parseInt(today.slice(8, 10)) && monthsToDisplay[x] === today.slice(4, 7)) {
               calendarCol.classList.add('beforeToday');
           } else {
               calendarCol.classList.add('dates');
           }
            const cellTextDate = listOfDates[x][counting]
            checkEventDates(eventDates, month, cellTextDate, calendarCol, monthsToDisplay)


           counting++
       } else {
           //
       }

       calendarRow.appendChild(calendarCol);

       if ((i > 1) && (listOfDates[x][counting] === listOfDates[x][(listOfDates[x]).length - 1])) {

           if (j === 6) {
               newInd = 1;
           } else {
               newInd = j + 2;
           }

           startInd = newInd;
       } 

   }
   return [startInd, counting]
}

// call functions needed
let startInd = startDate(today); // returns the starting date/index for the current month
const monthsToDisplay = listOfMonths(); // get what months to display
console.log(monthsToDisplay)

const listOfDates = listDates(monthsToDisplay); // get the dates for the corresponding months
let bookedDates = getEventDates();
// global variable for holding a new starting index for iterations greater than 0
let newStartInd = 0;
let yearInd = 0

if (monthsToDisplay[0] != 'Jan' && monthsToDisplay.includes('Jan')) {
    yearInd = monthsToDisplay.findIndex(month => month === "Jan");;
}

// make calendar js objects
for (var x = 0; x < monthsToShow; x++) {
   //make table
    const divCalendar = document.createElement('div');
    divCalendar.classList.add('calendarDiv');
    divCalendar.id = `month${alphabet[x]}`;
    const headerDiv = document.createElement('div');
    const buttonLeft = document.createElement('button');
    buttonLeft.classList.add('buttonLeft');
    buttonLeft.innerHTML = "<"
    buttonLeft.id = "buttonLeft";
    const header = document.createElement('h1');
    
    if (x === yearInd) {
        console.log(typeof year)
        year = (parseInt(year) + 1).toString();
        console.log(typeof year)
        
    }
        
    header.innerText = `${monthsToDisplay[x]} ${year}`;
    const buttonRight = document.createElement('button');
    buttonRight.classList.add('buttonRight');
    buttonRight.innerHTML = ">"
    buttonRight.id = "buttonRight"
    const calendarTable = document.createElement('table');
    calendarTable.classList.add('textCenter');
    header.classList.add('textCenter', 'calendarHeading', 'month');
    headerDiv.classList.add('headerDiv');
    
    if (x > 0 && x != (monthsToShow - 1)) {
        //startInd = newStartInd;
        divCalendar.classList.add("hide");
    } else if (x === 0) {
        buttonLeft.classList.add("visualhide");
    } else if (x === monthsToShow - 1) {
        buttonRight.classList.add("visualhide");
        divCalendar.classList.add("hide");
    }

    calendarTable.addEventListener('click', function onOpen(e) {
        const cell = e.target.closest('td');

        if (!cell) { return; } // Quit, not clicked on a cell
        if (Object.keys(daysOfWeekDict).includes(cell.innerText)) { return; } // Quit, not clicked on a cell
        if (cell.innerText === '') { return; } // Quit, not clicked on a cell
        if ( e.path[4].querySelector('h1').innerText === today.slice(4,7) && parseInt(cell.innerText) < parseInt(today.slice(8,10))) { return; } // Quit, not clicked on a cell
        
        for (var i = 0; i < cell.classList.length; i++) {
            if (cell.classList.value.split(" ")[i] === 'beforeToday') {return}
        }

        const value = e.srcElement.innerText;
        const popUpHeader = document.querySelector('#dateSelected');
        popUpHeader.classList.add('textCenter');
        const monthValue = e.path[4].querySelector('h1').innerText;

        popUpHeader.value = `${monthValue.slice(0,3)} ${value}, ${monthValue.slice(4)}`;
        if (typeof popUp.showModal === "function") {
            popUp.showModal();
        } else {
            alert("The <dialog> API is not supported by this browser");
        }
        });

    const tableBody = document.createElement('tbody'); // make table body
    let numOfRows = getNumOfRows(listOfDates, x); // find the number of rows needed for each calendar month
    let counting = 0; // initialize counting variables

    
    // make table rows and columns
    for (var i = 0; i < numOfRows; i++) {
        const calendarRow = document.createElement('tr');
        if (i === 0) {
            for (var j = 0; j < 7; j++) {
                const calendarCol = document.createElement('td');
                calendarCol.classList.add('textCenter', 'cellDesign', 'tableHead');
                const cellText = document.createTextNode(daysOfWeek[j][1]);
                calendarCol.appendChild(cellText);
                calendarRow.appendChild(calendarCol);
            }
        } else {
            let indices = makeCols(i, calendarRow, counting, startInd, bookedDates, x, monthsToDisplay);
            startInd = indices[0];
            counting = indices[1];
        }

        
        tableBody.appendChild(calendarRow)
    }

    calendarTable.appendChild(tableBody);
    headerDiv.appendChild(buttonLeft);
    headerDiv.appendChild(header);
    headerDiv.appendChild(buttonRight);
    divCalendar.appendChild(headerDiv);
    divCalendar.append(calendarTable);
    calendarsContainer.appendChild(divCalendar);
    
    calendarsContainer.classList.add('flexboxCalendar');
};


//formating arrow buttons
const buttonsLeft = document.querySelectorAll("#buttonLeft");
const buttonsRight = document.querySelectorAll("#buttonRight");

for (var button of buttonsLeft) {
   button.addEventListener('click', arrowButtons);
   
}
for (var button of buttonsRight) {
   button.addEventListener('click', arrowButtons);
   
}

function arrowButtons(e) {
   // based on which is clicked hide previous version and show 
   // current version
   let thisMonth = '';

   for (var x of e.path) {
       try {
           if (x.id.includes('month')) {
               const currentMonthInd = alphabet.indexOf(x.id.slice(-1));
               const nextMonthId = `month${alphabet[currentMonthInd + 1]}`;
               const lastMonthId = `month${alphabet[currentMonthInd - 1]}`;
               thisMonth = document.getElementById(x.id);

               if (e.path[0].id.includes('Right')) {

                   if (x.id === `month${alphabet[monthsToShow - 1]}`) {
                       //
                   } else {
                       thisMonth.classList.add('hide');
                       const nextMonth = document.getElementById(nextMonthId);
                       nextMonth.classList.remove('hide');

                       thisMonth = nextMonth;
                   }
                   
               } else if (e.path[0].id.includes('Left')) {

                   if (x.id === `month${alphabet[0]}`) {
                       //
                   } else {
                       thisMonth.classList.add('hide');
                       const lastMonth = document.getElementById(lastMonthId);
                       lastMonth.classList.remove('hide');

                       thisMonth = lastMonth
                   }
               }
           }

       } catch (error) {
          //
       }
       
           // buttonLeft = document.querySelector("#buttonLeft");
           // buttonRight = document.querySelector(``);

   }
   
   // buttonLeft = document.querySelector("thisMonth.id > #buttonLeft");
   // buttonRight = document.querySelector("thisMonth.id > #buttonRight");

}

const cancelButton = document.querySelector("#cancel");
cancelButton.addEventListener('click', function onOpen(e) {
   if (typeof popUp.showModal === "function") {
       popUp.close();
   } else {
     alert("The <dialog> API is not supported by this browser");
   }
 });