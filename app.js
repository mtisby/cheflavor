import dotenv from "dotenv"

if (process.env.NODE_ENV !== "productions") {
    dotenv.config()
}

import express from "express"
import mongoose from "mongoose"
import methodOverride from "method-override"
import flash from "connect-flash"
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import session from "express-session"
import passport from 'passport'
import LocalStrategy from 'passport-local'

import { ExpressError } from "./utilis/ExpressError.js"

import { events } from "./paths/events.js"
import { contactus } from "./paths/contactus.js"
import { menu } from "./paths/menu.js"
import { staffUserRoutes } from "./paths/staffportalUser.js"
import { staffRoutes } from "./paths/staffportalRoutes.js"

import { User } from './models/user.js'


import ejsMate from "ejs-mate"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

mongoose.connect('mongodb://localhost:27017/cheflavor', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();
const port = 3060;

app.engine('ejs', ejsMate)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static(__dirname + '/public'));
app.use(flash());

const sessionConfig = {
    secret: 'oopsmysecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig))
app.use(flash());

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

//********************//
//** customer paths **//
//********************//npm
app.get('/cheflavor', (req, res) => {
    res.render('./index.ejs', { __dirname })
})
app.use('/cheflavor/events', events)
app.use('/cheflavor/contactus', contactus)
app.use('/cheflavor/menu', menu)

//************************//
//** staff portal paths **//
//************************//
app.use('/cheflavor/stafflogin', staffUserRoutes)
app.use('/cheflavor/staffportal', staffRoutes)



//*************// 
//** general **//
//*************//
app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500, message = "something went wrong" } = err;
    res.status(statusCode).render('./errors/error.ejs', {err})
})

app.listen(port, () => {
    console.log(`listening on : ${port}`)
})
