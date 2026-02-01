const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

blogSchema.set("toJSON", {
  transform: (request, response) => {
    response.id = response._id.toString();
    delete response._id;
  },
});

module.exports = mongoose.model("Blog", blogSchema);
