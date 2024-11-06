const router = require('express').Router();
const {
    getAll,
    getOne,
    filtration
} = require('../Controller/product.controller');

router.get('/', getAll);
router.get('/get/:id', getOne);
router.get('/filtration', filtration);

module.exports = router;