import express from "express"
import mongoose from "mongoose"
import methodOverride from "method-override"

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
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.get('/cheflavor', (req, res) => {
    res.render('./index.ejs')
})

app.get('/cheflavor/contactus', (req, res) => {
    res.render('./contactus.ejs')
})

app.get('/cheflavor/menu', (req, res) => {
    res.render('./menu.ejs')
})

app.get('/cheflavor/events', (req, res) => {
    res.render('./cheFlavorEvents.ejs')
})


app.listen(3000, () => {
    console.log(`listening on : ${port}`)
})
