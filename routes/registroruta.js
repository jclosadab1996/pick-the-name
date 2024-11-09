const express = require('express');
const router = express.Router();
const registro = require('./models/registro');  // Suponiendo que el modelo se encuentra en models/User.js
const Registro = require('../models/Registro');

// Registrar usuario
router.post('/', async (req, res) => {
  try {
    const registro = new Registro(req.body);
    await registro.save();
    res.status(201).json(registro);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;