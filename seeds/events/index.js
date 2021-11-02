import mongoose from "mongoose"
import { Event } from "../../models/event.js";


mongoose.connect('mongodb://localhost:27017/cheflavor');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const seedDB = async () => {
    await Event.deleteMany({});

    const firstEvent = new Event({
        dateSelected: "Jan 1",
        timeSelected: "Tweleve",
        firstName: "John",
        lastName: "Smith",
        email: "J Smith",
        phoneNumber: 9647895612
    })
    await firstEvent.save()
}

seedDB().then(() => {
    mongoose.connection.close()
})