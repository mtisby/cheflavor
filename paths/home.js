import express from "express"

var router = express.Router();

router.get('/', (req, res) => {
    res.render('./index.ejs', { __dirname })
})

const home = router
export { home }