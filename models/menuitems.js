import mongoose from "mongoose"

const Schema = mongoose.Schema;

const MenuSchema = new Schema({
    title: String,
    img: String,
    description: String,
    price: Number,
    category: String
})

const Menu = mongoose.model('Menu', MenuSchema);

export { Menu }