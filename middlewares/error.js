const winston = require('winston')

module.exports = (err, req, res, next)=>{
    winston.error(err.messsage, err)
    res.status(500).send("There was a server error!!! Be patient, we are working on it");
}