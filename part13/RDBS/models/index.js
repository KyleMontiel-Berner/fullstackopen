const Blog = require("./blog");
const User = require("./user");
const ReadingList = require("./reading_list");

User.hasMany(Blog);
Blog.belongsTo(User);

Blog.belongsToMany(User, { through: ReadingList, as: "reading" });
User.belongsToMany(Blog, { through: ReadingList, as: "reading" });

module.exports = {
  Blog,
  User,
  ReadingList,
};
