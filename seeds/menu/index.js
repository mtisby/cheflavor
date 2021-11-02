import mongoose from "mongoose"
import { Menu } from "../../models/menuitems.js";
import { menuitems } from "./startingmenu.js"
import dotenv from "dotenv"

dotenv.config({ path: ".env" })

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/cheflavor';
mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const seedDB = async () => {
    await Menu.deleteMany({});

    for (var items of menuitems) {
        // console.log(items)
        const item = new Menu({
            title: items.title,
            img: items.img,
            description: items.description,
            price: items.price,
            category: items.category
        })
        await item.save()
        console.log(item)
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})