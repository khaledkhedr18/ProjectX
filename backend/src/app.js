const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Productivity API');
});

app.use('/api/tasks', taskRoutes);
  app.use('/api/auth', authRoutes);

module.exports = app;
