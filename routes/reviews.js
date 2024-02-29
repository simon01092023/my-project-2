const router = require('express').Router();
const passport = require('passport');
const reviewCtrl = require('../controllers/reviews');

router.post('/recipes/:id/reviews', reviewCtrl.create);
router.delete('/reviews/:id', reviewCtrl.delete);

module.exports = router;
