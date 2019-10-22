const express = require('express');
const cors = require('cors');
const userRoutes = require('../routes/user');
const foodRoutes = require('../routes/food');
const error = require('../middlewares/error');


module.exports = function(app){
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    app.use('/api/user', userRoutes);
    app.use('/api/food', foodRoutes);
    app.use(error)
    app.use('/', (req, res, next) => {
        console.log(req.headers);
        res.status(400).send("Page not found");
    });
}

