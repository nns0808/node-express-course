const express = require("express");
const router = express.Router();

const { getPeople, addPerson, updatePerson, deletePerson } = require("../controllers/people");
const { people } = require("../data");

// GET all people
router.get("/", getPeople);

// POST new person
router.post("/", addPerson);

// GET one person by ID
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const person = people.find((p) => p.id === id);

  if (!person) {
    return res.status(404).json({
      success: false,
      message: `Person with id ${id} not found`,
    });
  }

  res.status(200).json({ success: true, data: person });
});

// put update person
router.put("/:id", updatePerson);

// delete person
router.delete("/:id", deletePerson);

module.exports = router;
