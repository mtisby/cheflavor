import express from "express"
import { Menu } from "../models/menuitems.js"
import { asyncWrap } from "../utilis/asyncWrap.js"

var router = express.Router();

const orderedCategories = ['salads', 'flatbreads', 'appetizers', 'sandwiches', 'burgers'];

router.get('/', asyncWrap(async (req, res) => {
    const menu = await Menu.find({});
    res.render('./menu.ejs', {menu, orderedCategories})
}))

const menu = router
export { menu }