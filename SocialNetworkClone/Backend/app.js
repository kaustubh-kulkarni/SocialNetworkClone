const express = require('express');
const app = express();
const mongoose = require('mongoose');
const postsRoutes = require('./routes/posts');

// Connection to DB
mongoose.connect('mongodb://localhost:27017/mySocialNetwork', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log('Connected to database successfully');
    })
    .catch(() => {
        console.log('Connection failed');
    });

// Body parser setup
app.use(express.json());

// CORS enable header
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    next();
});

app.use("/api/posts", postsRoutes);

// Export the app module
module.exports = app;