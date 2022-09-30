const mongoose = require('mongoose');
//const encrypt = require('mongoose-encryption');
//const dotenv = require('dotenv');
//dotenv.config();

const userSchema =new mongoose.Schema({
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    createdOn:{
        type: Date,
        default: Date.now,
    }
});

// const encKey = process.env.ENC_KEY;

// userSchema.plugin(encrypt, { secret: encKey, encryptedFields: ['password'] });



module.exports =mongoose.model('User', userSchema);

 
