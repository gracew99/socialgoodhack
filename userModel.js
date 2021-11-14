const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    journals: [String],
    keywords: [String],
    library: [Object],
});

module.exports = mongoose.model('userPosts', userSchema);