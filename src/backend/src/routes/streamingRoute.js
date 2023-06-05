const express = require('express');

const streamingController = require('../controllers/streamingController');

const router = express.Router();

router.get("/", streamingController.list);

router.post("/", streamingController.create);

router.get("/:id", streamingController.findById);

router.put('/:id', streamingController.update);

router.delete('/:id', streamingController.remove);

module.exports = router