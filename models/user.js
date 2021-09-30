const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path');
//path where images will be stored
const AVATAR_PATH = path.join('/uploads/users/avatars');

const userSchema = new mongoose.Schema({
    email:{
        type :String,
        required :true,
        unique : true

    },
    password:{
        type :String,
        required :true
    },
    name :{
        type :String,
        required :true
    } ,
    avatar :{
        type:String,
        required: true
    }
},{
    timestamps : true//it keeps the track of when data got created and updated
}

);

const User = mongoose.model('User',userSchema);

module.exports = User;
