const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 100,
  message: 'Превышено допустимое количество запросов к серверу',
});

module.exports = limiter;
