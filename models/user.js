var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
  mountpoint: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  client_id: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  passhash: {
    type: String,
    required: true,
  },
  passwordConf: {
    type: String,
    required: true,
  },
  publish_acl: { type: mongoose.Schema.Types.Mixed, default: [
    {pattern: 'a/b/c'}, 
    {pattern: 'a/+/d'}
] },
subscribe_acl: { type: mongoose.Schema.Types.Mixed, default: [
  {pattern: 'a/#'}
] }
});


UserSchema.statics.authenticate = async (email, passhash ) =>{ 
  const user = await User.findOne({email})
  if(!user){
     throw new Error('Unable to Login')
  }
  const isMatch = await bcrypt.compare(passhash, user.passhash)
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
/*UserSchema.pre('save',async function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});  */

UserSchema.pre('save', async function (next){ 

  const user = this;
  try{
     user.passhash = await bcrypt.hash(user.passhash,8)
     console.log('saved');
     next();
    } catch (err) {
      console.log(err);
      return next(err);
  }

})


var User = mongoose.model('vmq_acl_auth', UserSchema);
module.exports = User;
