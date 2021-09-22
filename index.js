import express from "express"
import mongoose from "mongoose"
import methodOverride from "method-override"
import path from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(__dirname)

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
app.use(express.static(__dirname + '/js'));

app.get('/cheflavor', (req, res) => {
    res.render('./index.ejs')
})

app.get('/cheflavor/contactus', (req, res) => {
    res.render('./contactus.ejs')
})

app.get('/cheflavor/menu', (req, res) => {
    res.render('./menu.ejs', {__dirname})
})

app.get('/cheflavor/events', (req, res) => {
    res.render('./cheFlavorEvents.ejs')
})


app.listen(3000, () => {
    console.log(`listening on : ${port}`)
})
