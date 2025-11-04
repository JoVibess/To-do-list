async function logger(req, res, next) {
  console.log(`${req.ip} | ${req.method} ${req.path}`);
  next();
}

module.exports = logger;
