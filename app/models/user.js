var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
    Schema = mongoose.Schema,
    Transaction = ('./transaction');

//define schema
var userSchema = Schema({

  local : {
      email    : String,
      password : String
    },
  facebook : {
      id       : String,
      token    : String,
      email    : String,
      name     : String,
      photo    : String,
      friends  : [{ type: String }]
    },
    transactions : [{ type: Schema.Types.ObjectId, ref: 'Transaction'}]
  });


//generation hash
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(7), null);
};

  //check against our db user password
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

//create model and expose to app
module.exports = mongoose.model('User', userSchema);
