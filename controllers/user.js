const User = require("../models/user");
const { setUser } = require("../services/auth")

async function handleUserSignUp(req, res) {
    const { username, email, password } = req.body;

    await User.create({
        username: username,
        email: email,
        password: password
    })

    return res.redirect("/");
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;

    const result = await User.findOne({
        email: email,
        password: password
    })

    if(!result) return res.render("login", {
        error: "Invalid username or password"
    })

    const jwt = setUser(result);
    res.cookie('token', jwt);

    return res.redirect("/");
}

module.exports = {
    handleUserSignUp,
    handleUserLogin,
}