const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');

const CREATED = 201;

module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => {
      const { _id } = user;
      res.status(CREATED).send({
        _id,
        email,
        name,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') next(new BadRequestError('Переданы некорректные данные'));
      else if (err.code === 11000) next(new ConflictError(`Пользователь с адресом ${email} уже зарегистрирован`));
      else next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};

module.exports.getMyInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user) res.send(user);
      else throw new NotFoundError('Запрашиваемый пользователь не найден');
    })
    .catch((err) => {
      if (err.name === 'CastError') next(new BadRequestError('Переданы некорректные данные'));
      else next(err);
    });
};

module.exports.updateUserInfo = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(req.user._id, { email, name }, { new: true, runValidators: true })
    .then((user) => {
      if (user) res.send(user);
      else throw new NotFoundError('Запрашиваемый пользователь не найден');
    })
    .catch((err) => {
      if (err.name === 'ValidationError') next(new BadRequestError('Переданы некорректные данные'));
      else if (err.code === 11000) next(new ConflictError('Пользователь с такими данными уже зарегистрирован'));
      else next(err);
    });
};
