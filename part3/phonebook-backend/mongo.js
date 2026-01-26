const mongoose = require("mongoose");

const password = process.argv[2];
const phoneName = process.argv[3];
const phoneNum = process.argv[4];

const url = `mongodb+srv://kyle813berner_db_user:${password}@cluster0.rz4pl3o.mongodb.net/phonebook?appName=Cluster0`;

mongoose.set("strictQuery", false);
mongoose.connect(url, { family: 4 });

const newSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Phone", newSchema);

if (!phoneNum && !phoneName) {
  Person.find({}).then((persons) => {
    persons.forEach((person) => {
      console.log(person.name, person.number);
    });
    mongoose.connection.close();
  });
}

if (phoneNum && phoneName) {
  const phone = new Person({ name: phoneName, number: phoneNum });
  phone.save().then((response) => {
    console.log(`added ${phoneName} number ${phoneNum} to phonebook`);
    mongoose.connection.close();
  });
}
