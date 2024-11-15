const jwt = require("jsonwebtoken");
const secret = "TestSecret" // env


function setUser(user) {
    const payload = {
        id:user._id,
        // username: user.username,
        email: user.email
    };
    
    return jwt.sign(payload, secret)
}

function getUser(token) {
    if(!token) return null;
    // console.log(jwt.verify(token,secret))
    return jwt.verify(token, secret)
}

module.exports = {
    setUser,
    getUser
}