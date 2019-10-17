const express = require('express');

const router = express.Router();

const validationMiddleware = require('../middlewares/validations');
const authMiddleware = require('../middlewares/auth')
const userController = require('../controller/userController');
const foodController = require('../controller/foodController');

// routes for ordinary users
router.post('/signUp', validationMiddleware.validateSignUp, userController.signUp);
router.post('/logIn', validationMiddleware.validateLogin, userController.logIn)
router.get("/viewMenu", foodController.viewMenu);

// routes for admin
router.post('/addFood', validationMiddleware.validateFood, authMiddleware.checkAdmin, foodController.addFood);
router.get("/menu", foodController.viewMenu);
router.put("/edit-price", validationMiddleware.validateFood, authMiddleware.checkAdmin, foodController.editPrice);
router.delete("/delete-food", validationMiddleware.validateFoodName, authMiddleware.checkAdmin, foodController.deleteFood);
router.put("/make-food-unavaiable", validationMiddleware.validateFoodName,authMiddleware.checkAdmin, foodController.makeFoodUnavailable);
router.put("/make-food-available", validationMiddleware.validateFoodName, authMiddleware.checkAdmin, foodController.makeAvailable);



module.exports = router