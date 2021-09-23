import mongoose from "mongoose"
import { Event } from "../../models/events.js";


mongoose.connect('mongodb://localhost:27017/cheflavor');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const seedDB = async () => {
    await Event.deleteMany({});

    const firstEvent = new Event({
        dateSelected: String,
        timeSelected: String,
        firstName: String,
        lastName: String,
        email: String,
        phoneNumber: Number
    })
    await firstEvent.save()
}

seedDB().then(() => {
    mongoose.connection.close()
})