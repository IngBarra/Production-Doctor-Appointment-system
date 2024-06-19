const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Set up CORS to allow requests from http://localhost:3000
app.use(cors({
  origin: '*', // Allow requests from any origin
  credentials: true, // Include this if you're sending cookies or credentials.
}));

const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

// Rutas de autenticación
const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

// Rutas de roles
const roleRoutes = require('./routes/roleRoutes');
app.use('/roles', roleRoutes);

// Rutas de usuarios
const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);
const PacieteRoutes = require('./routes/pacienteRoutes');
app.use('/paciente', PacieteRoutes);

app.listen(port, () => {
  console.log(`Servidor en funcionamiento en el puerto ${port}`);
});
