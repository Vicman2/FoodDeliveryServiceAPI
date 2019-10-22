const winston = require('winston');
const mongoose = require('mongoose');
const config = require('../config/index')

module.exports = function(){
    mongoose.connect(config.databaseURL,  { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            winston.info("You are connected to mongodb")
         })
}