const { people } = require("../data");

// get all people
const getPeople = (req, res) => {
  res.json({ success: true, data: people });
};

// post add person
const addPerson = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Please provide a name",
    });
  }

  people.push({ id: people.length + 1, name });

  res.status(201).json({
    success: true,
    name,
  });
};

// get person by ID
const getPersonById = (req, res) => {
  const id = parseInt(req.params.id);
  const person = people.find((p) => p.id === id);

  if (!person) {
    return res.status(404).json({
      success: false,
      message: `Person with id ${id} not found`,
    });
  }

  res.status(200).json({
    success: true,
    data: person,
  });
};

// Update person
const updatePerson = (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;


  if (!name) {
    return res.status(400).json({
    success: false,
    message: "Please provide a name",
    });
}

  const person = people.find((p) => p.id === id);

  if (!person) {
    return res.status(404).json({
      success: false,
      message: `Person with id ${id} not found`,
    });
  }

  person.name = name;
  res.status(200).json({
    success: true,
    data: person,
  });
};

// Delete person
const deletePerson = (req, res) => {
  const id = parseInt(req.params.id);

  const person = people.find((p) => p.id === id);
  if (!person) {
    return res.status(404).json({
      success: false,
      message: `Person with id ${id} not found`,
    });
  }

  const remaining = people.filter((p) => p.id !== id);

  
  people.length = 0;
  remaining.forEach((p) => people.push(p));

  res.status(200).json({
    success: true,
    message: `Person with id ${id} deleted`,
  });
};

module.exports = { getPeople, addPerson, updatePerson, deletePerson, getPersonById };
