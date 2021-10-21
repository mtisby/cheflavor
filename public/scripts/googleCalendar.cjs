const gapi = require("googleapis")
require('dotenv').config(".env")



// Provide the required configuration
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
const calendarId = process.env.CALENDAR_ID;

// Client ID and API key from the Developer Console
var CLIENT_ID = CREDENTIALS.client_id;
var API_KEY = CREDENTIALS.private_key;

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  })
}

initClient()

/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */

function createDate(eventTimes) {
  let day = eventTimes.dateSelected.slice(4, 7).trim()
  day = day.slice(0, day.length-1)
  let month = eventTimes.dateSelected.slice(0, 3)
  let year = eventTimes.dateSelected.slice(7, eventTimes.dateSelected.length)
  let time = eventTimes.timeSelected
  let date = `${day} ${month} ${year} ${time} UTC`
  let eventDate = new Date(date).toISOString()
  let endDate = `${day} ${month} ${year} ${parseInt(time) + 5} UTC`
  let eventTime = new Date(endDate).toISOString()

  var event = {
    'summary': 'Catering Event',
    'location': 'TBD',
    'description': `Catering Event for ${eventTimes.firstName} ${eventTimes.lastName}`,
    'start': {
      'dateTime': eventDate,
      'timeZone': 'America/Los_Angeles'
    },
    'end': {
      'dateTime': eventTime,
      'timeZone': 'America/Los_Angeles'
    },
    'attendees': [
      {'email': eventTimes.email},
    ]
  };

  
  // var request = gapi.client.calendar.events.insert({
  //   'calendarId': calendarId,
  //   'resource': event
  // });


  req.execute(function(event) {
    appendPre('Event created: ' + event.htmlLink);
  });
      
}

module.exports = createDate