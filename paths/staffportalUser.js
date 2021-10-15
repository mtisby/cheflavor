import express from "express"
import passport from "passport"
import { asyncWrap } from "../utilis/asyncWrap.js";
import { User } from "../models/user.js";

const router = express.Router()

router.get('/register', (req, res) => {
    res.render("staffportal/register.ejs")
})

router.post('/register', asyncWrap(async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, error => {
            if (err) {
                return next(err)
            } else {
                req.flash('success', 'Welcome to YelpCamp')
                res.redirect('/cheflavor/staffportal/home') 
            }
        })
    } catch (e) {
        console.log(e)
        req.flash('error', e.message);
        res.redirect('register')
    }
    
}))


router.get('/login', (req, res) => { 
    res.render("staffportal/login.ejs")
})

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login'}), (req, res) => {
    req.flash('success', "Welcome Back!");
    console.log("Welcome Back!")
    const redirectUrl = req.session.returnTo || '/cheflavor/staffportal/home';
    delete req.session.returnTo;
    res.redirect(redirectUrl)
})

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', "Goodbye!");
    res.redirect('/cheflavor');
})

const staffUserRoutes = router
export { staffUserRoutes }