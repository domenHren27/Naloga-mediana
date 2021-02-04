const express = require('express');
const medianaController = require('../controllers/mediana.controller');

const router = express.Router();

router.get('/mediana/get', medianaController.get);
router.post('/mediana/calculate', medianaController.calculate);


module.exports = router;