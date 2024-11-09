// app.js
const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const clientRoutes = require('./routes/clientRoutes');
const registroRoutes = requiere('./routes/registroruta');
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Conectar a MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch(error => console.error('Error de conexión:', error));

// Rutas
app.use('/api/clients', clientRoutes);
app.use('/api/registroruta',registroRoutes);

// Servir HTML principal
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/desktop/bootcamp/pick-the-name/index.html');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
