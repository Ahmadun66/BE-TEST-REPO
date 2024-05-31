require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

const mongoUri = process.env.MONGO_URI;

// MongoDB connection
mongoose.connect(mongoUri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/users', require('./routes/UserRoute'));
app.use('/products', require('./routes/ProductRoute'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
