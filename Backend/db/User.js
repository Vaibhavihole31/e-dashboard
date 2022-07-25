const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : String,
    email: String,
    password: String
});

const userModel = mongoose.model('users', userSchema) // stucture
module.exports = userModel;

// module.exports = mongoose.model("users",userSchema);



// const mongoose = require('mongoose');

// // derived from a Schema

// const messageSchema = new mongoose.Schema({
//     user: String,
//     messageType: String,
//     messageBody: String,
//     createdAt: {type: Date, default: Date.now}
//  });
 
// //  got a schema with one property

// const messageModel = mongoose.model('messages', messageSchema) // stucture

// module.exports = messageModel;