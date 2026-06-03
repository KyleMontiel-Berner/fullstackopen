const jwt = require("jsonwebtoken");
const { SECRET } = require("./config");

const errorHandler = (error, req, res, next) => {
  console.error(error.message);
  return res.status(400).json({ error });
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (!(authorization && authorization.toLowerCase().startsWith("bearer "))) {
    return res.status(401).end();
  } else {
    req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    console.log("decodedToken", req.decodedToken);
    next();
  }
};

module.exports = { errorHandler, tokenExtractor };
