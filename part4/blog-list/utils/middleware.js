const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    request.token = authorization.replace("Bearer ", "");
  }
  next();
};

const userExtractor = async (request, response, next) => {
  const token = jwt.verify(request.token, process.env.SECRET);
  request.user = await User.findById(token.id);
  next();
};

module.exports = { tokenExtractor, userExtractor };
