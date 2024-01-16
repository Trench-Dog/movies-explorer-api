const router = require('express').Router();

const signupRouter = require('./signup');
const signinRouter = require('./signin');

const auth = require('../middlewares/auth');

const userRouter = require('./users');
const movierouter = require('./movies');

const NotFoundError = require('../errors/NotFoundError');

router.use('/', signupRouter);
router.use('/', signinRouter);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movierouter);
router.use('*', (req, res, next) => next(new NotFoundError('Такой страницы не существует')));

module.exports = router;
