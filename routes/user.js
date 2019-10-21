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
router.put('/add-to-cart',validationMiddleware.validateFoodName, authMiddleware.checkUser, userController.addToCart);
router.delete('/remove-from-cart', validationMiddleware.validateFoodName, authMiddleware.checkUser, userController.removeFromCart);
router.put('/change-quantity', validationMiddleware.quantityChange, authMiddleware.checkUser, userController.changeQuantity);
router.get('/view-cart', authMiddleware.checkUser, userController.viewCart);

// routes for admin
router.post('/addFood', validationMiddleware.validateFood, authMiddleware.checkAdmin, foodController.addFood);
router.get("/menu", foodController.viewMenu);
router.put("/edit-price", validationMiddleware.validateFood, authMiddleware.checkAdmin, foodController.editPrice);
router.delete("/delete-food", validationMiddleware.validateFoodName, authMiddleware.checkAdmin, foodController.deleteFood);
router.put("/make-food-unavaiable", validationMiddleware.validateFoodName,authMiddleware.checkAdmin, foodController.makeFoodUnavailable);
router.put("/make-food-available", validationMiddleware.validateFoodName, authMiddleware.checkAdmin, foodController.makeAvailable);
router.put("/make-admin", validationMiddleware.validateEmail, authMiddleware.checkAdmin, userController.makeAdmin);
router.put("/unmake-admin", validationMiddleware.validateEmail, authMiddleware.checkAdmin, userController.unmakeAdmin);



module.exports = router