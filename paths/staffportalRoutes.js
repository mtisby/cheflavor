import express from "express"
import { isLoggedIn } from "../middleware/loginMiddleware.js";
import { asyncWrap } from "../utilis/asyncWrap.js";
import { Event } from "../models/event.js";
import { Feedback } from "../models/feedback.js";

const router = express.Router()

router.get('/home', isLoggedIn, (req, res) => {
    res.render("staffportal/home.ejs")
})

router.get('/menu', isLoggedIn, (req, res) => { 
    res.render("staffportal/editmenuhome.ejs")
})

router.get('/events', isLoggedIn, asyncWrap (async(req, res) => {
    const events = await Event.find({});
    res.render("staffportal/events.ejs", {events})
}))

router.get('/feedback', isLoggedIn, asyncWrap(async (req, res) => {
    const feedback = await Feedback.find({});
    res.render("staffportal/feedback.ejs", {feedback})
}))

const staffRoutes = router
export { staffRoutes }