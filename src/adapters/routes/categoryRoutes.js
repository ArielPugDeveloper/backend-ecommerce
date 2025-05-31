////////TAREAAAAA 1

const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');

router.get('/', CategoryController.getCategories);
router.post('/', CategoryController.createCategory);

module.exports = router;