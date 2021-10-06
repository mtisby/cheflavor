import mongoose from "mongoose"
import { Event } from "../../models/event.js"

mongoose.connect('mongodb://localhost:27017/cheflavor', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected for events");
});


async function getEvents() {
    const events = await Event.find({});
    return events
}

const EventsLoaded = getEvents()

export {EventsLoaded}