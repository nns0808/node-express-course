const Task = require('../models/Task')
const mongoose = require('mongoose')

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
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: 'Invalid task ID' })
  }

  try {
    const task = await Task.findById(id)
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' })
    }
    res.status(200).json(task)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

// UPDATE
const updateTask = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: 'Invalid task ID' })
  }

  try {
    const task = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!task) {
      return res.status(404).json({ msg: 'Task not found' })
    }
    res.status(200).json(task)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

// DELETE
const deleteTask = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: 'Invalid task ID' })
  }

  try {
    const task = await Task.findByIdAndDelete(id)

    if (!task) {
      return res.status(404).json({ msg: 'Task not found' })
    }
    res.status(200).json({ msg: 'Task deleted' })
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

module.exports = {
  createTask,
  getAllTasks,
  getTask,
  updateTask,
  deleteTask,
}

