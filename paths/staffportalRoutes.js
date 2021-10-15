import express from "express"
import { isLoggedIn } from "../middleware/loginMiddleware.js";
import { asyncWrap } from "../utilis/asyncWrap.js";

const router = express.Router()

router.get('/home', isLoggedIn, (req, res) => {
    res.render("staffportal/home.ejs")
})

router.get('/menu', isLoggedIn, (req, res) => { 
    res.render("staffportal/editmenu.ejs")
})

router.get('/events', isLoggedIn, (req, res) => { 
    res.render("staffportal/events.ejs")
})

router.get('/feedback', isLoggedIn, (req, res) => { 
    res.render("staffportal/feedback.ejs")
})

const staffRoutes = router
export { staffRoutes }