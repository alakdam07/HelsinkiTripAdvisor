const notfound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (error, req, res, next) => {
  const statuscode = res.statuscode === 200 ? 500 : res.statuscode;
  res.status(statuscode);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === "production" ? "🤖" : error.stack
  });
};

module.exports = { notfound, errorHandler };
