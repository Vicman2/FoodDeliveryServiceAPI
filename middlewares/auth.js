const JWT = require('jsonwebtoken');

exports.checkUser = (req, res, next)=> {
    try {
        const token = req.headers["x-access-token"];
        if(!token) return res.status(400).send({success: false, message: "No token provided"});
        const validToken = JWT.verify(token,  process.env.myTokenPrivateKey);
        req.email = validToken.email;
        next();
    } catch (err) {
        if(err.message && err.message== "invalid signature") return res.status(401).send({success: false, message: "Invalid token"})
        console.log(err)
    }
}

exports.checkAdmin =  (req, res, next)=> {
    try {
        const token = req.headers["x-access-token"];
        if(!token) return res.status(400).send({success: false, message: "No token provided"});
        const validToken = JWT.verify(token,  process.env.myTokenPrivateKey);
        let admin = validToken.isAdmin;
        if(!admin) return res.status(401).send({success: false, message: "Access denied!!!"});
        next();
    } catch (err) {
        if(err.message && err.message== "invalid signature") return res.status(401).send({success: false, message: "Invalid token"})
        console.log(err)
    }
}

