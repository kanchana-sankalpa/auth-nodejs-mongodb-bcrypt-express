var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  passwordConf: {
    type: String,
    required: true,
  }
});


UserSchema.statics.authenticate = async (email, password ) =>{ 
  const user = await User.findOne({email})
  if(!user){
     throw new Error('Unable to Login')
  }
  const isMatch = await bcrypt.compare(password, user.password)
  if(!isMatch){
     throw new Error('Unable to Login')
  }
  return user
}
/*
//authenticate input
UserSchema.statics.authenticate = function (email, password, callback) {
  User.findOne({ email: email })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
}
*/

//hashing a password 
UserSchema.pre('save',async function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});

UserSchema.pre('save', async function (next){ 
  const user = this;
  try{
     user.password = await bcrypt.hash(user.password,8)
     next();
    } catch (err) {
      console.log(err);
      return next(err);
  }

})


var User = mongoose.model('User', UserSchema);
module.exports = User;
