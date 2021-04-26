const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/posts', { useNewUrlParser: true, useUnifiedTopology: true });

// Creating a schema
const postSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true }
});

// Model to work with
module.exports = mongoose.model('Post', postSchema);