const BAD_REQUEST_ERROR = 400;

module.exports = class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = BAD_REQUEST_ERROR;
  }
};
