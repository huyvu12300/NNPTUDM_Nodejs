const express = require("express");
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');
const { authMiddleware } = require("../middleware/authMiddleware");

router.post('/create', CategoryController.createCategory);
router.put('/update/:id', authMiddleware, CategoryController.updateCategory);
router.get('/details/:id', CategoryController.getDetailCategory);
router.get('/get-all', CategoryController.getAllCategories);

module.exports = router;