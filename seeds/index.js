import mongoose from "mongoose"
import { Menu } from "../models/menuitems.js";
import { menuitems } from "./startingmenu.js"

mongoose.connect('mongodb://localhost:27017/cheflavor');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const seedDB = async () => {
    await Menu.deleteMany({});

    for (var items of menuitems) {
        const item = new Menu(
            items
        )
        await item.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})