import express from "express"
import mongoose from "mongoose"
import methodOverride from "method-override"
import path from 'path';
import { Menu } from "./models/menuitems.js"
import { Feedback } from "./models/feedback.js"
import { Event } from "./models/event.js"
import { asyncWrap } from "./utilis/asyncWrap.js"
import { ExpressError } from "./utilis/ExpressError.js"
import { eventSchema } from "./schemas/schemas.js";

import { fileURLToPath } from 'url';
import { dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const orderedCategories = ['salads', 'flatbreads', 'appetizers', 'sandwiches', 'burgers'];

const validateEvent = (req, res, next) => {
    
    const{error} = eventSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(result.error.details, 400)
    }
    next();
}

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
const port = 3000;

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static(__dirname + '/public'));

app.get('/cheflavor', (req, res) => {
    res.render('./index.ejs', { __dirname })
})

app.get('/cheflavor/contactus', (req, res) => {
    res.render('./contactus.ejs')
})

app.post('/cheflavor/contactus', asyncWrap(async (req, res) => {
    const feedback = new Feedback(req.body);
    await feedback.save()
    res.redirect('/cheflavor')
}))

app.get('/cheflavor/menu', asyncWrap(async (req, res) => {
    const menu = await Menu.find({});
    res.render('./menu.ejs', {menu, orderedCategories})
}))

app.get('/cheflavor/events', (req, res) => {
    res.render('./cheFlavorEvents.ejs')
})

app.post('/cheflavor/events', validateEvent(asyncWrap(async (req, res) => {
    const evt = new Event(req.body.event);
    await evt.save()
    res.redirect('/cheflavor/eventConfirmation')
})))

app.get('/cheflavor/eventConfirmation', (req, res) => {
    res.render('./eventConfirmation.ejs')
})

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500, message = "something went wrong" } = err;
    res.send(`${statusCode} ${message}`)
})

app.listen(3000, () => {
    console.log(`listening on : ${port}`)
})
