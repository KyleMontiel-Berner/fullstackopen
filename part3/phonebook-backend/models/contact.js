const mongoose = require("mongoose");

const url = process.env.MONGO_DB_URL;

mongoose.set("strictQuery", false);

mongoose
  .connect(url)
  .then((result) => console.log("connected to MongoDB"))
  .catch((error) => console.log(error.message));

const mongoSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minlength: 8,
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{2,3}-\d+$/.test(v);
      },
      message: (props) =>
        `${props.value} is not allowed. please submit a new number`,
    },
  },
});

mongoSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Contact", mongoSchema);
