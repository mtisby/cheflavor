import mongoose from "mongoose"
import { Menu } from "../../models/menuitems.js"

mongoose.connect('mongodb://localhost:27017/cheflavor', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

async function getMenuItems() {
    const menu = await Menu.find({});
    let categories = [];
    for (var item of menu) {
        if (!categories.includes(item.category)){
            categories.push(item.category)
        }
    }

    let finalMenu = []
    for (var section of categories) {
        const sectionType = await Menu.find({ category: section });
        finalMenu.push(sectionType)
    }

    // console.log(finalMenu)
    return finalMenu
}

const menuItems = getMenuItems();

export { menuItems }