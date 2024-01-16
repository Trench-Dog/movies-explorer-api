const router = require('express').Router();

const { login } = require('../controllers/users');
const { loginIsValid } = require('../middlewares/validation');

router.post('/signin', loginIsValid, login);

module.exports = router;
