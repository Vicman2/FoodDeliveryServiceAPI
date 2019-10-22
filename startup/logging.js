const winston = require('winston');
require('winston-mongodb')
require('express-async-errors');
const config = require('../config/index')

module.exports = function(){
    process.on('uncaughtException', (ex) => {
        winston.info(ex.message, ex)
        process.exit(1)
    })
    process.on('unhandledRejection', (ex) => {
        winston.info(ex.message, ex)
        process.exit(1)
    })
    
    winston.add(winston.transports.File, {filename: 'logFile.log'})
    winston.add(winston.transports.MongoDB, {db: config.databaseURL, level: "info"})
    
}