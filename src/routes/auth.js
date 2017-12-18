const router = require('express').Router();
const authController = require('../controllers/auth_controller');

router.get('/login', (req, resp) => {
    resp.render('login');
});

router.post('/login', authController.login);

router.get('/logout', (req, resp) => {
    req.logout();
    resp.redirect('/login');
});

module.exports = router;