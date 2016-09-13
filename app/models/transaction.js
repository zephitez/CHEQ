var mongoose = require('mongoose'),
    User = require('./user'),
    Schema = mongoose.Schema;


//define schema

var transactionSchema = mongoose.Schema({


    // FOREIGN KEY TO REFERENCE USER_RELATION
    first_user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    second_user: { type: Schema.Types.ObjectId, ref: 'User'},
    amount: Number,
    item: String
  },
    {
      timestamps: true

});

//create model and expose to app
module.exports = mongoose.model('Transaction', transactionSchema);
