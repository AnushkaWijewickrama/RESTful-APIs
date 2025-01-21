const express = require('express');
const userController = require('../controllers/user');
const router = express.Router();

router.get('/', userController.getUser);
router.post('/', userController.postUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
