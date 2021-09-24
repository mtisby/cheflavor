import mongoose from "mongoose"

const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
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
    text: {
        type: String,
        required: true
    }
})

const Feedback = mongoose.model('Feedback', feedbackSchema);

export { Feedback }