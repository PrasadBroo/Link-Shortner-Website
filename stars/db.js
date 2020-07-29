const mongoose = require('mongoose');



const myStarSchema = new mongoose.Schema({
    FullUrl:{
        type: String,
        required: true
    },
    ShortUrl:{
        type: String,
        required: true
    },
    Visits:{
        default:0,
        required: true,
        type:Number
    }
});


module.exports = mongoose.model('Db',myStarSchema);