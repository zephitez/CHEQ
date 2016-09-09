//load the things we needed
var mongoose = require('mongoose'),


//define schema

var transactionSchema = mongoose.Schema({


    // FOREIGN KEY TO REFERENCE USER_RELATION
    first_user: String,
    second_user: String,
    amount: Number,
    type: String,
    item: String


});

//create model and expose to app
module.exports = mongoose.model('UserRelation', userSchema);
