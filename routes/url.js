const express = require("express");
const { handleGenerateShortUrl, handleGetRedirectUrl, handleGetAnalytics } = require("../controllers/url");

const router = express.Router();

router.post('/', handleGenerateShortUrl);

router.get("/:shortId", handleGetRedirectUrl);

router.get("/:shortId/analytics", handleGetAnalytics);



module.exports = router;