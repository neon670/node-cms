const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CategorySchema = new Schema({
    name:{
        type: String,
        require: true,
    }

});

module.exports = mongoose.model('Categories', CategorySchema);