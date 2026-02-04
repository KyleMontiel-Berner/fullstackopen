const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

blogSchema.set("toJSON", {
  transform: (request, response) => {
    response.id = response._id.toString();
    delete response._id;

    if (response.user) {
      response.user = response.user.toString();
    }
  },
});

module.exports = mongoose.model("Blog", blogSchema);
