const express = require('express');
const mongoose = require('mongoose');
const Task = require('../models/Task');

const router = express.Router();

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

router.get('/', async (req, res, next) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ message: 'Identifiant de tâche invalide' });
    }

    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Tâche introuvable' });
    }

    return res.json(task);
  } catch (error) {
    return next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { title, description, completed } = req.body;
    const task = await Task.create({ title, description, completed });
    return res.status(201).json(task);
  } catch (error) {
    return next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ message: 'Identifiant de tâche invalide' });
    }

    const updates = {};
    if (Object.prototype.hasOwnProperty.call(req.body, 'title')) {
      updates.title = req.body.title;
    }
    if (Object.prototype.hasOwnProperty.call(req.body, 'description')) {
      updates.description = req.body.description;
    }
    if (Object.prototype.hasOwnProperty.call(req.body, 'completed')) {
      updates.completed = req.body.completed;
    }

    const task = await Task.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return res.status(404).json({ message: 'Tâche introuvable' });
    }

    return res.json(task);
  } catch (error) {
    return next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ message: 'Identifiant de tâche invalide' });
    }

    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Tâche introuvable' });
    }

    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
