require("dotenv").config();
const Contact = require("./models/contact");
const express = require("express");
const morgan = require("morgan");

const app = express();

morgan.token("userContent", (request) => {
  return JSON.stringify(request.body);
});

app.use(express.static("dist"));
app.use(express.json());
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :userContent",
  ),
);

app.get("/api/persons", (request, response, next) => {
  Contact.find({})
    .then((contacts) => {
      response.json(contacts);
    })
    .catch((error) => next(error));
});

app.get("/info", (request, response, next) => {
  Contact.find({})
    .then((contacts) =>
      response.send(`<p>Phonebook has info for ${contacts.length} people</p>
      <p>${new Date()}</p>`),
    )
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (request, response, next) => {
  Contact.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note);
      } else {
        response.status(400).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  Contact.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response
      .status(400)
      .json({ error: "name and number must be complete" });
  } else {
    const contact = new Contact({
      name: body.name,
      number: body.number,
    });

    contact
      .save()
      .then((savedContact) => {
        response.json(savedContact);
      })
      .catch((error) => next(error));
  }
});

app.put("/api/persons/:id", (request, response, next) => {
  const { name, number } = request.body;

  const newContact = {
    name: name,
    number: number,
  };

  Contact.findByIdAndUpdate(request.params.id, newContact, { new: true })
    .then((contact) => response.json(contact))
    .catch((error) => next(error));
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "inappropriate id format" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
