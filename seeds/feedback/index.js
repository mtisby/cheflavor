import mongoose from "mongoose"
import { Feedback } from "../../models/feedback.js";


mongoose.connect('mongodb://localhost:27017/cheflavor');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const seedDB = async () => {
    await Feedback.deleteMany({});

    const firstFeedback = new Feedback({
        firstName: "Mark",
        lastName: "Green",
        email: "mgreen@hotmail.com",
        text: "awesome restaurant Matt!"
    })
    await firstFeedback.save()
}

seedDB().then(() => {
    mongoose.connection.close()
})