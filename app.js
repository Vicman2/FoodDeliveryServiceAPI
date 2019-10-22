const express = require('express');
const winston = require('winston');
const config = require('./config')
const app = express();

require('./startup/logging')()
require('./startup/routes')(app)
require('./startup/db')();

const port = config.port
console.log(config.port)
app.listen(port, ()=>{
    winston.info(` Listening on port ${port}`);
})