const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PostSchema = new Schema({
    user:{
       

    },

    title:{
       type:String,
       required: true 
    },
    file:{
        type: String
    },
    status:{
        type:String,
        default: 'public'
    },
    allowComments:{
        type: Boolean,
        required:true
    },
    body:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now()
    }

});

module.exports = mongoose.model('Post', PostSchema);