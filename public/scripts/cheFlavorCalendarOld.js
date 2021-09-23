// global variables
const months = {
    Jan: 31, Feb: 28, Mar: 31, April: 30, May: 31, Jun: 30, Jul: 31, Aug: 31,
   Sep: 30, Oct: 31, Nov: 30, Dec: 31
};
const monthsList = Object.keys(months);
const daysOfWeek = [[1, "Sun"], [2, "Mon"], [3, "Tue"],  [4, "Wed"],  [5, "Thu"],  [6, "Fri"],  [7, "Sat"] ]
const daysOfWeekDict = { Sun: 1, Mon: 2, Tue: 3, Wed: 4, Thu: 5, Fri: 6, Sat: 7};
const today = Date();
const start = 1;
const monthsToShow = 6;
const count = 1;

// select div container that will contain all displayed calendars
const calendarsContainer = document.querySelector('#calendarContainer');
const popUp = document.querySelector('#popUp');


// quality check 
// check if leap it is a Leap Year
if (parseInt(today.slice(12, 16), 10) % 4 === 0) {
   months[Feb] = 29;
}

// functions 
// finding starting index & the date
function startDate(currentDate) {
   const dayInd = daysOfWeekDict[today.slice(0, 3)];
   const dateNum = parseInt(today.slice(8, 10));

   const remainder = dateNum % 7;
   return Math.abs(dayInd - remainder);
}
// create and return a list which contains the name of the months to display
function listOfMonths() {
   currentMonth = today.slice(4, 7);
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
                       console.log(monthsToShow - (x + 1))
                       for (var restart = 0; restart < (monthsToShow - x); restart++) {
                           console.log(restart);
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
   console.log(monthsToDisplay)
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

function getNumOfRows(listOfDates) {
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

// call functions needed
let startInd = startDate(today); // returns the starting date/index for the current month
const monthsToDisplay= listOfMonths(); // get what months to display
const listOfDates = listDates(monthsToDisplay); // get the dates for the corresponding months

// global variable for holding a new starting index for iterations greater than 0
let newStartInd = 0;

// make calendar js objects
for (var x = 0; x < monthsToShow; x++) {
   if (x > 0) {
       startInd = newStartInd;
   }

   //make table
   const divCalendar = document.createElement('div');
   divCalendar.classList.add('calendarDiv');
   const header = document.createElement('h1');
   header.innerText = monthsToDisplay[x];
   const calendarTable = document.createElement('table');
   calendarTable.classList.add('textCenter');
   header.classList.add('textCenter', 'calendarHeading', 'month');
  

    calendarTable.addEventListener('click', function onOpen(e) {
        const cell = e.target.closest('td');
 
        if (!cell) { return; } // Quit, not clicked on a cell
        if (Object.keys(daysOfWeekDict).includes(cell.innerText)) { return; } // Quit, not clicked on a cell
        if (cell.innerText === '') { return; } // Quit, not clicked on a cell
        if ( e.path[4].querySelector('h1').innerText === today.slice(4,7) && parseInt(cell.innerText) < parseInt(today.slice(8,10))) { return; } // Quit, not clicked on a cell
        const value = e.srcElement.innerText;
        const popUpHeader = document.querySelector('#dateSelected');
        popUpHeader.classList.add('textCenter');
        const monthValue = e.path[4].querySelector('h1').innerText;

        popUpHeader.value = `${monthValue} ${value}`;
        if (typeof popUp.showModal === "function") {
            popUp.showModal();
        } else {
            alert("The <dialog> API is not supported by this browser");
       }
     });

   const tableBody = document.createElement('tbody'); // make table body
   
   let numOfRows = getNumOfRows(listOfDates); // find the number of rows needed for each calendar month

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
       } else if (i === 1) {
           for (var j = 0; j < 7; j++) {
               const calendarCol = document.createElement('td');
               calendarCol.classList.add('textCenter', 'cellDesign');

               if (j < startInd) {
                   // keep empty
               } else if (j + 1 >= startInd) {
                   const cellText = document.createTextNode(listOfDates[x][counting]);
                
                   calendarCol.appendChild(cellText);
                   if (listOfDates[x][counting] === parseInt(today.slice(8, 10)) && monthsToDisplay[x] === today.slice(4,7)) {
                       calendarCol.classList.add('today');
                   } else if (listOfDates[x][counting] < parseInt(today.slice(8, 10)) && monthsToDisplay[x] === today.slice(4, 7)) {
                       calendarCol.classList.add('beforeToday');
                   } else {
                       calendarCol.classList.add('dates');
                   }

                   counting++
               }
               calendarRow.appendChild(calendarCol);
               
           }
       } else {
           
           for (var j = 0; j < 7; j++) {
               const calendarCol = document.createElement('td');
               calendarCol.classList;
               calendarCol.classList.add('textCenter', 'cellDesign');


               if (counting < listOfDates[x][listOfDates[x].length - 1]) {
                   const cellText = document.createTextNode(listOfDates[x][counting]);
                   calendarCol.appendChild(cellText);

                   if (listOfDates[x][counting] === parseInt(today.slice(8, 10)) && monthsToDisplay[x] === today.slice(4, 7)) {
                       calendarCol.classList.add('today');
                   } else if (listOfDates[x][counting] < parseInt(today.slice(8, 10)) && monthsToDisplay[x] === today.slice(4, 7)) {
                       calendarCol.classList.add('beforeToday');
                   } else {
                       calendarCol.classList.add('dates');
                   }

                   counting++
               }

               if (listOfDates[x][counting] === listOfDates[x][(listOfDates[x]).length - 1]) {

                   if (j === 6) {
                       newStartInd = 1;
                   } else {
                       newStartInd = j + 2;
                   }
               }
   
               calendarRow.appendChild(calendarCol);
           }

           
       }

       
       tableBody.appendChild(calendarRow)
       
   }
   calendarTable.appendChild(tableBody);
   divCalendar.appendChild(header);
   divCalendar.append(calendarTable);
   calendarsContainer.appendChild(divCalendar);
   
   calendarsContainer.classList.add('flexboxCalendar');
};


const cancelButton = document.querySelector("#cancel");
cancelButton.addEventListener('click', function onOpen(e) {
    if (typeof popUp.showModal === "function") {
        popUp.close();
    } else {
      alert("The <dialog> API is not supported by this browser");
    }
  });