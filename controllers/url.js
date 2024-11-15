const shortid = require("shortid")
const URL = require("../models/url")

async function handleGenerateShortUrl(req, res){
    const body = req.body;

    if(!body.url) return res.status(404).json({message: "URL is Required"});
    const shortId = shortid.generate();
    await URL.create({
        shortId: shortId,
        redirectUrl: body.url,
        visitHistory: [],
        createdBy: req.user
    })

    return res.render("home", {
        id: shortId
    });
}

async function handleGetRedirectUrl(req,res){
    const shortId = req.params.shortId;
    // console.log(shortId)
    const entry = await URL.findOneAndUpdate(
        {shortId}, 
        {$push: { "visitHistory": { timestamp: Date.now()}}}
    )

    res.status(301).redirect(entry.redirectUrl);
}

async function handleGetAnalytics(req,res){
    const shortId = req.params.shortId;
    // console.log(shortId);
    const entry = await URL.findOne({
        shortId: shortId
    })
    if(!entry) return res.status(404).json()
    return res.status(200).json({
        data: {
            redirectUrl: entry.redirectUrl,
            totalClicks: entry.visitHistory.length,
            details: entry.visitHistory
        }
    })
}

async function handleDeleteShortUrl(req,res) {
    const shortId = req.params.shortId;
    let result;
    try{
        result = await URL.findOneAndDelete({shortId: shortId});
    } catch (err) {
        throw new Error("Error adding user: " + err);
    }

    if(!result) res.status(404).json({message: "Requested URL does not exist"})
    return res.status(200).json({data: {shortId:result.shortId}})
}

async function handleGetUserShortUrls(req,res) {
    // console.log(req.user)
    if(req.user){
        const userUrls = await URL.find({ createdBy:req.user.id});
        return res.render("allUrls", {
            urls: userUrls,
        })
    }
    else return res.render("allUrls");
}

module.exports = {
    handleGenerateShortUrl,
    handleGetRedirectUrl,
    handleGetAnalytics,
    handleDeleteShortUrl,
    handleGetUserShortUrls
}