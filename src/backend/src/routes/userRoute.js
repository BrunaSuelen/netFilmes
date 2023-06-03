const express = require('express');

const userController = require('../controllers/userController');

const router = express.Router()

router.post("/", userController.getUser)

router.post("/create", userController.createUser)


module.exports = router