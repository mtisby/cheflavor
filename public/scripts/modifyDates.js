const months = {
    Jan: 0, Feb: 1, Mar: 2, April: 3, May: 4, Jun: 5, Jul: 6, Aug: 7,
   Sep: 8, Oct: 9, Nov: 10, Dec: 11
};
  
let today = new Date();

function stringtoDate(dateString) {
    let arr = dateString.split(' ');
    let date = new Date(parseInt(arr[2]), months[arr[0]], parseInt(arr[1]));
    return date
}

function sortDates(listOfDates) {
    let sorted = []
    for (var i = 0; i < listOfDates.length; i++) {
        let min = new Date(listOfDates[0]).getTime();
        let track = listOfDates[0]
        for (var j = 0; j < listOfDates.length; j++) {
            if (i != j && new Date(listOfDates[j]).getTime() < min) {
                min = new Date(listOfDates[j]).getTime()
                track = listOfDates[j]
            }
        }
        
        listOfDates.splice(listOfDates.indexOf(track), 1)
        sorted.push(track)
    }

    return sorted
}
 
export { stringtoDate, sortDates, months}