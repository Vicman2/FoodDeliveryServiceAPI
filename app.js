const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()

const  userRoutes = require('./routes/user.js'); // Importing the users routes
// const adminRoutes = require('./routes/adminRoutes.js')// Importing the admin routes


const app = express();

app.use(express.json())
app.use(express.urlencoded());

const port = process.env.PORT



app.use('/user', userRoutes);
// app.use('/admin');



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