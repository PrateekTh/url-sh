const express = require("express")

const router = express.Router();


router.get('/', (req, res)=>{
    return res.render("home")
})

router.get('/success', (req, res)=>{
    return res.render("home")
})

module.exports = router;