const express = require('express');

const app = express();

// CORS enable header
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});
// Get posts endpoint
app.use('/api/posts', (req, res, next) => {
    const posts = [
        { id: '1', title: 'First server side post', content: 'Coming from server' },
        { id: '2', title: 'Second server side post', content: 'Coming from server' }
    ];
    res.status(200).json({
        message: 'Posts fetched successfully!',
        posts: posts
    })
});



module.exports = app;