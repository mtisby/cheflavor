import express from "express"
import { Feedback } from "../models/feedback.js"
import { asyncWrap } from "../utilis/asyncWrap.js"
import { ExpressError } from "../utilis/ExpressError.js"

var router = express.Router();

router.get('/', (req, res) => {
    res.render('./contactus.ejs')
})

router.post('/', asyncWrap(async (req, res) => {
    console.log(req.body)
    const feedback = new Feedback(req.body);
    // console.log(feedback)
    await feedback.save()
    res.redirect('/cheflavor/')
}))

const contactus = router
export { contactus }