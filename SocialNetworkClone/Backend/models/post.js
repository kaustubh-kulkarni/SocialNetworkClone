const mongoose = require('mongoose');

// Creating a schema
const postSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true }
});

// Model to work with
module.exports = mongoose.model('Post', postSchema);