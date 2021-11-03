import express from "express"
import { Event } from "../models/event.js"
import { eventSchema } from "../schemas/schemas.js";
import { asyncWrap } from "../utilis/asyncWrap.js"
import { ExpressError } from "../utilis/ExpressError.js"
import createDate from "../public/scripts/googleCalendar.cjs";
import dotenv from "dotenv"
dotenv.config('../.env')


var router = express.Router();

router.get('/', asyncWrap(async (req, res) => {
    const events = await Event.find({});
    res.render('./cheFlavorEvents.ejs', {events})
}))

router.post('/', asyncWrap(async (req, res) => {
    const { error } = eventSchema.validate(req.body, {stripUnknown:true});
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        console.log(msg)
        throw new ExpressError(msg, 400)
    }
    const event = new Event(req.body);
    await event.save()
    res.redirect('/cheflavor/events/eventConfirmation')
}))

router.get('/eventConfirmation', (req, res) => {
    res.render('eventConfirmation.ejs')
})


const events = router
export { events }