import express from "express"
import { User } from "../models/user.js"
import { catchAsync } from "../utilis/catchAsync.js"
import passport from "passport"

const router = express.Router()

router.get('/login', (req, res) => { 
    res.render("staffportal/login.ejs")
})

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login'}), (req, res) => {
    req.flash('success', "Welcome Back!");
    const redirectUrl = req.session.returnTo || '/';
    delete req.session.returnTo;
    res.redirect(redirectUrl)
})

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', "Goodbye!");
    res.redirect('/cheflavor');
})

const userRoutes = router
export { userRoutes }