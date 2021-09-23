import mongoose from "mongoose"

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    dateSelected: String,
    timeSelected: String,
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: Number
})

const Event = mongoose.model('Event', eventSchema);

export { Event }