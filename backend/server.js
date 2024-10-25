require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',  
  optionsSuccessStatus: 200,        
};
app.use(cors(corsOptions));  

// Middleware
app.use(express.json({ limit: '50kb' }));  
app.use(bodyParser.json({ limit: '50kb' }));  
app.use(bodyParser.urlencoded({ extended: true, limit: '50kb' }));  

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://curtisssrafiei:2727Mahsa$@cluster0.4rhxu.mongodb.net/';
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));


app.use('/api/contacts', contactRoutes);


const PORT = process.env.PORT || 8500;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});