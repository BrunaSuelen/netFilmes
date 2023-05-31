const express = require('express');

const streamingController = require('../controllers/streamingController');

const router = express.Router();

router.get("/", streamingController.listStreaming);

router.post("/", streamingController.createStreaming);

router.put('/:id', streamingController.updateStreaming);

router.delete('/:id', streamingController.removeStreaming);

module.exports = router