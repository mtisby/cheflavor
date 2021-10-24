const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
require('dotenv').config(".env")



// Provide the required configuration
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
const calendarId = process.env.CALENDAR_ID;


// Client ID and API key from the Developer Console
var CLIENT_ID = CREDENTIALS.client_id;
var API_KEY = CREDENTIALS.private_key;

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];


// Load client secrets from a local file.
fs.readFile('cheflavor-events-329718-b2d86c50c68c.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Calendar API.
  authorize(JSON.parse(content), listEvents);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

function createDate(eventTimes) {
  const calendar = google.calendar({version: 'v3', auth});
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

  
  calendar.events.insert({
    auth: auth,
    calendarId: 'primary',
    resource: event,
  }, function(err, event) {
    if (err) {
      console.log('There was an error contacting the Calendar service: ' + err);
      return;
    }
    console.log('Event created: %s', event.htmlLink);
  });
      
}

module.exports = createDate