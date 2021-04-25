const express = require('express');

const app = express();
// Middleware function
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