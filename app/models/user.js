//load the things we needed
var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs');

//define schema
var userSchema = mongoose.Schema({

    // first_name: String,
    // last_name: String,
    // username: {
    //   type: String,
    //   required: true
    // },
    email: {
      type: String,
      required: true

    },
    password: {
      type: String,
      required: true
    }

});

//method
//generation hash
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(7), null);
};

  //check against our db user password
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

//create model and expose to app
module.exports = mongoose.model('User', userSchema);
