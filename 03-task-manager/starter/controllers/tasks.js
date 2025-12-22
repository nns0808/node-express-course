const Task = require('../models/Task')

// CREATE
const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body)
    res.status(201).json(task)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// READ ALL
const getAllTasks = async (req, res) => {
  const tasks = await Task.find({})
  res.status(200).json(tasks)
}

// READ ONE
const getTask = async (req, res) => {
  const { id } = req.params
  const task = await Task.findById(id)
  if (!task) {
    return res.status(404).json({ msg: 'Task not found' })
  }
  res.status(200).json(task)
}

// UPDATE
const updateTask = async (req, res) => {
  const { id } = req.params
  const task = await Task.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  })
  if (!task) {
    return res.status(404).json({ msg: 'Task not found' })
  }
  res.status(200).json(task)
}

// DELETE
const deleteTask = async (req, res) => {
  const { id } = req.params
  const task = await Task.findByIdAndDelete(id)
  if (!task) {
    return res.status(404).json({ msg: 'Task not found' })
  }
  res.status(200).json({ msg: 'Task deleted' })
}

module.exports = {
  createTask,
  getAllTasks,
  getTask,
  updateTask,
  deleteTask,
}
