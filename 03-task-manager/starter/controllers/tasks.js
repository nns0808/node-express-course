const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-error');

// READ ALL
const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

// CREATE
const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

// READ ONE
const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;

  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with id: ${taskID}`, 404));
  }

  res.status(200).json({ task });
});

// DELETE
const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;

  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with id: ${taskID}`, 404));
  }

  res.status(200).json({ task });
});

// UPDATE
const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;

  const task = await Task.findOneAndUpdate(
    { _id: taskID },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!task) {
    return next(createCustomError(`No task with id: ${taskID}`, 404));
  }

  res.status(200).json({ task });
});

module.exports = {
  createTask,
  getAllTasks,
  getTask,
  updateTask,
  deleteTask,
};

