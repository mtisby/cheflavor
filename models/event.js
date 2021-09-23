import mongoose from "mongoose"

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name: String,
    email: String,
    phoneNumber: Number,
    date: String,
    time: String
})

const Event = mongoose.model('Event', eventSchema);

export { Event }