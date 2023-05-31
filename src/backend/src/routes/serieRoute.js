const express = require('express');

const serieController = require('../controllers/serieController');

const router = express.Router();

router.get("/", serieController.listSerie);

router.post("/", serieController.createSerie);

router.put('/:id',serieController.updateSerie);

router.delete('/:id', serieController.removeSerie);

module.exports = router