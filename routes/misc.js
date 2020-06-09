const router = require('express').Router();

router.route('/favicon.ico').get((req, res) => res.status(204));

router.route('/about').get((req, res) => {
    res.render('about');
});

module.exports = router;