const express = require('express');
const mongoose = require('mongoose');
const error = require('./middlewares/error');
const winston = require('winston');
require('winston-mongodb')
require('express-async-errors');
require('dotenv').config()

const  userRoutes = require('./routes/user.js'); // Importing the users routes
// const adminRoutes = require('./routes/adminRoutes.js')// Importing the admin routes

process.on('uncaughtException', (ex) => {
    winston.info(ex.message, ex)
    process.exit(1)
})
process.on('unhandledRejection', (ex) => {
    winston.info(ex.message, ex)
    process.exit(1)
})

const app = express();
winston.add(winston.transports.File, {filename: 'logFile.log'})
winston.add(winston.transports.MongoDB, {db: `mongodb://localhost/${process.env.databaseName}` , level: "info"})

app.use(express.json())
app.use(express.urlencoded({extended: false}));

const port = process.env.PORT




app.use('/user', userRoutes);
app.use(error)



app.listen(port, ()=>{
    mongoose.connect(`mongodb://localhost/${process.env.databaseName}`,  { useNewUrlParser: true, useUnifiedTopology: true })
        .then(value => {
            console.log("You are connected to mongodb")
        })
        .catch(err=> {
            console.log(err);
        })  
    console.log(`Listening on port ${port}`);
})