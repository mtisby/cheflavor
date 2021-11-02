// Require google from googleapis package.
const { google } = require('googleapis')
require('dotenv').config({ path: "../../.env" })

// Require oAuth2 from our google instance.
const { OAuth2 } = google.auth

// months array
const months = {
  Jan: 0, Feb: 1, Mar: 2, April: 3, May: 4, Jun: 5, Jul: 6, Aug: 7,
 Sep: 8, Oct: 9, Nov: 10, Dec: 11
};

// Create a new instance of oAuth and set our Client ID & Client Secret.
let credentials = JSON.parse(process.env.CREDENTIALS);
credentials = credentials.web
const oAuth2Client = new OAuth2(credentials.client_id, credentials.client_secret)

const calendar_id = process.env.CALENDAR_ID;
// Call the setCredentials method on our oAuth2Client instance and set our refresh token.
oAuth2Client.setCredentials({
  refresh_token: process.env.TOKEN
})

// Create a new calender instance.
const calendar = google.calendar({ version: 'v3', auth: oAuth2Client })

function createDate(eventTimes) {
  let day = eventTimes.dateSelected.slice(4, 7).trim()
  day = day.slice(0, day.length-1)
  let month = months[eventTimes.dateSelected.slice(0, 3)]
  let year = eventTimes.dateSelected.slice(7, eventTimes.dateSelected.length)
  let time = parseInt(eventTimes.timeSelected.slice(0,2))
  let eventStart = new Date(year, month, day, time)
  let eventEnd = new Date(year, month, day, time+5)

  /*
      ***important note***
  because this code is not for an actual restaurant, the individual's contact info
  is not listed under the "attendees" key because it will send an invitation to whatever
  email is listed. To prevent inviting random people to this mock website, the email is 
  only listed in the description. In the actual website, the email will be listed 
  under the "attendees" key so that users can see the reservation they made in their
  google calendar and receive email updates.
  */
  var event = {
    'summary': `Catering Event with ${eventTimes.firstName} ${eventTimes.lastName}`,
    'location': 'TBD',
    'description': `Catering Event for ${eventTimes.firstName} ${eventTimes.lastName}. Contact info: ${eventTimes.email}`,
    'start': {
      'dateTime': eventStart,
      'timeZone': 'America/Los_Angeles'
    },
    'end': {
      'dateTime': eventEnd,
      'timeZone': 'America/Los_Angeles'
    }
    // 'attendees': [
    //   {'email': eventTimes.email},
    // ]
  };

  calendar.freebusy.query(
    {
      resource: {
        timeMin: eventStart,
        timeMax: eventEnd,
        timeZone: 'America/Los_Angeles',
        items: [{ id: calendar_id }],
      },
    },
    (err, res) => {
      // Check for errors in our query and log them if they exist.
      if (err) return console.error('Free Busy Query Error: ')
      
  
      // Create an array of all events on our calendar during that time.
      const eventArr = res.data.calendars[calendar_id].busy
  
      // Check if event array is empty which means we are not busy
      if (eventArr.length === 0)
        // If we are not busy create a new calendar event.
        return calendar.events.insert(
          { calendarId: calendar_id, resource: event },
          err => {
            // Check for errors and log them if they exist.
            if (err) return console.error('Error Creating Calender Event:')
            // Else log that the event was created.
            return console.log('Calendar event successfully created.')
          }
        )
  
      // If event array is not empty log that we are busy.
      return console.log(`Sorry I'm busy...`)
    }
  )
}

module.exports = createDate