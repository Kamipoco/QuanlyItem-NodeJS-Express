var express = require('express');
var router = express.Router();

var authMiddleware = require('../middlewares/auth.middleware');

var controller = require('../controllers//product.controller');

router.get('/', authMiddleware.requireAuth, controller.index);

router.get('/search', controller.search);

module.exports = router;    