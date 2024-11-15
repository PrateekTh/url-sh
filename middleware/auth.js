const { getUser } = require("../services/auth");

async function restrictToLoggedInUser(req, res, next) {
    const userToken = req.cookies?.token;
    if(!userToken) return res.redirect("/login");

    const user = getUser(userToken);
    if(!user) return res.redirect("/login");

    req.user = user;
    next();
}

async function checkAuth(req, res, next) {
    const userToken = req.cookies?.token;
    const user = getUser(userToken);
    
    req.user = user;
    next();
}

module.exports = {
    restrictToLoggedInUser,
    checkAuth
}