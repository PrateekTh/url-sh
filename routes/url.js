const express = require("express");
const URL = require("../models/url")
const { handleGenerateShortUrl, handleGetRedirectUrl, handleGetAnalytics, handleDeleteShortUrl } = require("../controllers/url");

const router = express.Router();

router.post('/', handleGenerateShortUrl);

router.get("/:shortId", handleGetRedirectUrl);

router.delete("/:shortId", handleDeleteShortUrl);

router.get("/:shortId/analytics", handleGetAnalytics);



module.exports = router;