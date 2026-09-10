require('dotenv').config();

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const port = process.env.PORT || 5000;

app.disable('x-powered-by');

const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map((origin) => origin.trim())
  : [];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('CORS origin non autorisée'));
  }
}));

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/tasks', taskRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route introuvable' });
});

app.use((error, req, res, next) => {
  if (error.name === 'ValidationError') {
    const messages = Object.values(error.errors).map((item) => item.message);
    return res.status(400).json({ message: messages.join(', ') });
  }

  if (error instanceof SyntaxError && error.status === 400 && error.body) {
    return res.status(400).json({ message: 'JSON invalide' });
  }

  console.error(error);
  return res.status(500).json({ message: 'Erreur interne du serveur' });
});

const startServer = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error('La variable MONGO_URI est obligatoire');
  }

  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB connecté');

  app.listen(port, () => {
    console.log(`API TaskFlow disponible sur http://localhost:${port}`);
  });
};

startServer().catch((error) => {
  console.error('Impossible de démarrer le serveur :', error.message);
  process.exit(1);
});
