import express from "express"
import { isLoggedIn } from "../middleware/loginMiddleware.js";
import { asyncWrap } from "../utilis/asyncWrap.js";
import { Event } from "../models/event.js";
import { Feedback } from "../models/feedback.js";
import multer from "multer"
import { storage } from "../cloudinary/index.cjs"
import { Menu } from "../models/menuitems.js"
import cloudinary from "../cloudinary/index.cjs"
import { changeAvailability } from "../public/scripts/inproduction/menuAvailabilityCustomer.js";

let check = null;

const orderedCategories = ['salads', 'flatbreads', 'appetizers', 'sandwiches', 'burgers'];

const upload = multer({ storage });

const router = express.Router()

router.get('/home', isLoggedIn, async (req, res) => {
    const feedback = await Feedback.find({});
    const events = await Event.find({});
    res.render("staffportal/home.ejs", {feedback, events})
})

router.get('/menu', isLoggedIn, (req, res) => { 
    res.render("staffportal/menuhome.ejs")
})

router.get('/menu/edit', isLoggedIn, async (req, res) => {
    const menu = await Menu.find({});
    res.render("staffportal/editmenu.ejs", {menu, orderedCategories})
})

router.put('/menu/edit/', isLoggedIn, upload.single('image'), async (req, res) => {
    const id = req.body.id
    const menu = await Menu.findByIdAndUpdate(id, { ...req.body.menu });
    const newImg = req.file.path
    menu.img = newImg
    await menu.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.cloudinary.uploader.destroy(filename);
        }
        await menu.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }
    req.flash('success', `Successfull Updated ${req.body.title}`);
    res.redirect(`/cheflavor/staffportal/home`)
})

/* *** TBD: for making menu items temporarily unavailable*** */

// router.post('/menu/edit/available/', isLoggedIn, async (req, res) => {
//     const itemId = req.body.itemId;
//     const availabilityId = req.body.availabilityId;
//     changeAvailability(itemId, availabilityId)
//     res.send('yurp')
// })

router.get('/menu/add', isLoggedIn, (req, res) => { 
    res.render("staffportal/addmenu.ejs")
})

router.put('/menu/add/', isLoggedIn, upload.single('image'), async (req, res) => {
    const menu = new Menu(req.body);
    const newImg = req.file.path
    menu.img = newImg
    await menu.save();
    res.redirect(`/cheflavor/staffportal/home`)
    
})

router.delete('/menu/edit/:id', isLoggedIn, upload.single('image'), async (req, res) => {
    const id = req.body.itemId;
    await Menu.findByIdAndDelete(id)
    req.flash('success', 'Successfully deleted menu item')
    res.redirect(`/cheflavor/staffportal/home`)
})

router.get('/events', isLoggedIn, asyncWrap (async(req, res) => {
    const events = await Event.find({});
    res.render("staffportal/events.ejs", {events})
}))

router.post('/events', isLoggedIn, asyncWrap(async (req, res) => {
    const id = req.body.eventId
    console.log(id)
    const event = await Event.findByIdAndUpdate(id, {...req.body});
    // const event = await Event.findByIdAndUpdate(id);
    res.redirect(`/cheflavor/staffportal/home`)
}))

router.get('/feedback', isLoggedIn, asyncWrap(async (req, res) => {
    const feedback = await Feedback.find({});
    res.render("staffportal/feedback.ejs", {feedback})
}))

router.post('/feedback/search', isLoggedIn, asyncWrap(async (req, res) => {
    const searchReq = req.body.mySearch;
    const result1 = await Feedback.find({ 'firstName': { $regex: searchReq, $options: 'i' } } )
    const result2 = await Feedback.find({ 'lastName':{ $regex: searchReq, $options: 'i' } })
    const result3 = await Feedback.find({ 'email':{ $regex: searchReq, $options: 'i' } })
    const result4 = await Feedback.find({ 'text':{ $regex: searchReq, $options: 'i' } })
    
    const results = [result1, result2, result3, result4];
    let feedback = []
    for (var i = 0; i < results.length; i++) {
        if (results[0][i] != undefined) {
            feedback.push(results[0][i])
        }
    }

    res.render("staffportal/feedback.ejs", {feedback})
    
}))

const staffRoutes = router
export { staffRoutes }