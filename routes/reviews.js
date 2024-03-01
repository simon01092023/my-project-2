const router = require('express').Router();
const passport = require('passport');
const reviewCtrl = require('../controllers/reviews');

router.post('/recipes/:id/reviews', reviewCtrl.create);
router.delete('/reviews/:id', reviewCtrl.delete);
router.get('/reviews/:id', reviewCtrl.edit);
router.put('/reviews/:id', reviewCtrl.update);

module.exports = router;
