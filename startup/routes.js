const express = require('express');
const userRoutes = require('../routes/user');
const foodRoutes = require('../routes/food');
const error = require('../middlewares/error');

module.exports = function(app){
    app.use(express.json())
    app.use(express.urlencoded({extended: false}));
    app.use('/api/user', userRoutes);
    app.use('/api/food', foodRoutes);
    app.use(error)
}

