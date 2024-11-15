const express = require("express");
const { handleGetUserShortUrls } = require("../controllers/url");

const router = express.Router();


router.get('/', (req, res)=>{
    return res.render("home")
})

// router.get('/success', (req, res)=>{
//     return res.render("home")
// })
router.get("/all", handleGetUserShortUrls);

router.get('/signup', (req, res)=>{
    return res.render("signup")
})

router.get('/login', (req, res)=>{
    return res.render("login")
})

module.exports = router;