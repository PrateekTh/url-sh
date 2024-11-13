const shortid = require("shortid")
const URL = require("../models/url")

async function handleGenerateShortUrl(req, res){
    const body = req.body;

    if(!body.url) return res.status(404).json({message: "URL is Required"});
    const shortId = shortid.generate();
    await URL.create({
        shortId: shortId,
        redirectUrl: body.url,
        visitHistory: []
    })

    return res.status(201).json({data:{shortId: shortId}});
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

module.exports = {
    handleGenerateShortUrl,
    handleGetRedirectUrl,
    handleGetAnalytics
}