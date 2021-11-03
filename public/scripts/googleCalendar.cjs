const months = {
  Jan: 0, Feb: 1, Mar: 2, April: 3, May: 4, Jun: 5, Jul: 6, Aug: 7,
 Sep: 8, Oct: 9, Nov: 10, Dec: 11
};
// Require google from googleapis package.
const { google } = require('googleapis')
require('dotenv').config({ path: "./.env" })

// Require oAuth2 from our google instance.
const { OAuth2 } = google.auth

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
  
    //`${day} ${month} ${year} ${time} UTC`
    //`${day} ${month} ${year} ${time} UTC`
  let eventDate = new Date(year, month, day, time)

    //.toISOString()
  let eventTime = new Date(year, month, day, time+5)
    //.toISOString()
  // console.log(eventTime)
  // console.log(typeof eventTime)

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

  calendar.freebusy.query(
    {
      resource: {
        timeMin: eventDate,
        timeMax: eventTime,
        timeZone: 'America/Los_Angeles',
        items: [{ id: calendar_id }],
        // c34tcckonj2ot26j5veg4redhg@group.calendar.google.com
      },
    },
    (err, res) => {
      // Check for errors in our query and log them if they exist.
      if (err) return console.error('Free Busy Query Error: ', err)
      
  
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