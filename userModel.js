const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    journals: [String],
    keywords: [String],
});

module.exports = mongoose.model('userPosts', userSchema);