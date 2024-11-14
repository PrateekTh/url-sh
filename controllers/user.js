const User = require("../models/user");

async function handleUserSignUp(req, res) {
    const { username, email, password } = req.body;

    await User.create({
        username: username,
        email: email,
        password: password
    })

    return res.render("/");
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

    return res.redirect("/");
}

module.exports = {
    handleUserSignUp,
    handleUserLogin,
}