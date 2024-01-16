const router = require('express').Router();

const { createUser } = require('../controllers/users');
const { registerIsValid } = require('../middlewares/validation');

router.post('/signup', registerIsValid, createUser);

module.exports = router;
