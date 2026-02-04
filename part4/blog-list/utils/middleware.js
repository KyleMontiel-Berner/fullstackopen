const jwt = require("jsonwebtoken");
const User = require("../domain-model/user");

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    request.token = authorization.replace("Bearer ", "");
  }
  next();
};

const userExtractor = async (request, response, next) => {
  try {
    const token = jwt.verify(request.token, process.env.SECRET);
    request.user = await User.findById(token.id);

    if (!request.user) {
      return response.status(401).json({ error: "user not found" });
    }
    next();
  } catch (error) {
    return response.status(401).json({ error: "Unauthorized: invalid token" });
  }
};

module.exports = { tokenExtractor, userExtractor };
