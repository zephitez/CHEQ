//load the things we needed
var mongoose = require('mongoose'),


//define schema

var userRelationSchema = mongoose.Schema({


    // FOREIGN KEY TO REFERENCE USERS
    first_user: String,
    second_user: String


});

//create model and expose to app
module.exports = mongoose.model('UserRelation', userSchema);
