import mongoose from "mongoose"

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    dateSelected: {
        type: String,
        required: true
    },
    timeSelected: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        minlength: 10
    },
    eventDescription: {
        type: String,
        required: false
    }
})

const Event = mongoose.model('Event', eventSchema);

export { Event }