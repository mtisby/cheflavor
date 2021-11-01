// import from
const feedback = JSON.parse(feedbackObj);

let feedbackToDisplay = 25;

const feedbackContainer = document.querySelector('#feeback');

if (feedback.length === 0 || feedback === undefined) {
    const h3 = document.createElement('h3');
    h3.innerHTML = "Sorry, no results found"
    feedbackContainer.appendChild(h3)
} else {
    for (var i = 0; i < feedbackToDisplay || i < feedback.length; i++) {
        const currentObj = feedback[i]
        console.log(currentObj)
    
        const feedbackDiv = document.createElement('div');
        const p1 = document.createElement('p');
        p1.classList.add('customerInfo')
        p1.innerHTML = `${currentObj.firstName} ${currentObj.lastName} @${currentObj.email}`
        const p2 = document.createElement('p');
        p2.classList.add('feedbackText')
        p2.innerHTML = `${currentObj.text}`
    
        feedbackDiv.appendChild(p1);
        feedbackDiv.appendChild(p2);
        feedbackContainer.appendChild(feedbackDiv)
    }
}