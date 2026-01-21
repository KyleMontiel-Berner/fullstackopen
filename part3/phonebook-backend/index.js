const express = require("express");
const morgan = require("morgan");
const app = express();

let notes = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

morgan.token("userContent", (request) => {
  return JSON.stringify(request.body);
});

app.use(express.json());
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :userContent",
  ),
);

app.get("/api/persons", (request, response) => {
  response.json(notes);
});

app.get("/info", (request, response) => {
  response.send(`<p>Phonebook has info for ${notes.length} people</p>
    <p>${new Date()}</p>`);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const note = notes.find((note) => note.id === id);

  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  notes = notes.filter((note) => note.id !== id);
  response.status(204).end();
});

const generateRandomId = () => {
  const randomId = Math.floor(Math.random() * 100000);
  return String(randomId);
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response
      .status(400)
      .json({ error: "name and number must be complete" });
  } else if (notes.find((note) => note.name === body.name)) {
    return response.status(400).json({ error: "duplicate name found" });
  } else {
    const note = {
      id: generateRandomId(),
      name: body.name,
      number: body.number,
    };

    notes = notes.concat(note);

    return response.json(note);
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
