const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
    origin: "https://movie-verse-pn6b.vercel.app",
    credentials: true,
     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With'
    ]
  })
);
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/movies', require('./routes/movies'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/users', require('./routes/users'));

console.log("MONGODB_URI =", process.env.MONGODB_URI);
const dns = require("dns"); dns.setServers(["1.1.1.1", "8.8.8.8"]);

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://awaizkalyani_db_user:Awaiz%409747@cluster0.haavhvs.mongodb.net/movieverse');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});