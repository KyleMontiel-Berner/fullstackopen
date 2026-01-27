const mongoose = require("mongoose");

const url = process.env.MONGO_DB_URL;

mongoose.set("strictQuery", false);

mongoose
  .connect(url)
  .then((result) => console.log("connected to MongoDB"))
  .catch((error) => console.log(error.message));

const mongoSchema = new mongoose.Schema({
  name: String,
  number: String,
});

mongoSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Contact", mongoSchema);
