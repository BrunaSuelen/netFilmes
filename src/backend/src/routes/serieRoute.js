const express = require('express');

const serieController = require('../controllers/serieController');

const router = express.Router();

router.get("/", serieController.list);
router.get("/:id", serieController.findById);

router.post("/", serieController.create);

router.put('/:id',serieController.updateById);

router.delete('/:id', serieController.removeById);

module.exports = router