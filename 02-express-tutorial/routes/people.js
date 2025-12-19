const express = require("express");
const router = express.Router();

const {
  getPeople,
  addPerson,
  updatePerson,
  deletePerson,
  getPersonById,
} = require("../controllers/people");

// GET all people
router.get("/", getPeople);

// POST new person
router.post("/", addPerson);

// GET one person by ID
router.get("/:id", getPersonById);

// PUT update person
router.put("/:id", updatePerson);

// DELETE person
router.delete("/:id", deletePerson);

module.exports = router;

