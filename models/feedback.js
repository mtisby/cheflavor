import mongoose from "mongoose"

const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    name: String,
    email: String,
    text: String,
})

const Feedback = mongoose.model('Feedback', feedbackSchema);

export { Feedback }