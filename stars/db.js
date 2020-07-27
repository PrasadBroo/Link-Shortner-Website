const mongoose = require('mongoose');



const myStarSchema = new mongoose.Schema({
    FullUrl:{
        type: String,
        required: true
    },
    ShortUrl:{
        type: String,
        required: true
    }
});


module.exports = mongoose.model('Db',myStarSchema);