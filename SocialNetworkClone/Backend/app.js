const express = require('express');
const app = express();
const mongoose = require('mongoose');
// Importing post model
const Post = require('./models/post');

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
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});

// POST endpoint
app.post("/api/posts", (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save();
    res.status(201).json({
        message: 'Post added successfully!'
    });
});

// GET posts endpoint
app.get('/api/posts', (req, res, next) => {
    Post.find()
        .then(documents => {
            res.status(200).json({
                message: 'Posts fetched successfully!',
                posts: documents
            });
        });
});

// DELETE post endpoint
app.delete("/api/posts/:id", (req, res, next) => {
    Post.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json({ message: "Post deleted!" });
    });
});



module.exports = app;