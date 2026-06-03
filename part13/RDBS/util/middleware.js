const jwt = require("jsonwebtoken");
const { SECRET } = require("./config");
const Session = require("../models/session");

const errorHandler = (error, req, res, next) => {
  console.error(error.message);
  return res.status(400).json({ error });
};

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get("authorization");
  if (!(authorization && authorization.toLowerCase().startsWith("bearer "))) {
    return res.status(401).end();
  } else {
    const token = authorization.substring(7);
    req.token = token;
    req.decodedToken = jwt.verify(token, SECRET);
    const session = await Session.findOne({
      where: { token },
    });
    if (!session) {
      return res.status(401).json({ error: "session expired" });
    }
    next();
  }
};

module.exports = { errorHandler, tokenExtractor };
