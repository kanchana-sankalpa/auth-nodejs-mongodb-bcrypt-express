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
  username: {
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
  subscribe_acl: { type: mongoose.Schema.Types.Mixed, default: [
    {pattern: '#'}
  ] },
  publish_acl: { type: mongoose.Schema.Types.Mixed, default: [
    {pattern: '#'}
  ] }
}, { collection: 'vmq_acl_auth' });

/*
  publish_acl: { type: mongoose.Schema.Types.Mixed, default: [
 {
    "pattern": "a/+/c",
    "max_qos": 2,
    "max_payload_size": 128,
    "allowed_retain": true,
    "modifiers": {
        "topic": "ntopic",
        "payload": "new payload",
        "qos": 2,
        "retain": true,
        "mountpoint": "other-mountpoint"
    }
}
] },

subscribe_acl: { type: mongoose.Schema.Types.Mixed, default: [
  {
    "pattern": "a/+/c",
    "max_qos": 2,
    "modifiers": [
        ["new/topic/1", 1],
        ["new/topic/2", 1]
    ]
}
] }
*/

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
  //console.log('save');
  //console.log(user.passhash);
  const user = this;
  try{
    var passhash = await bcrypt.hash(user.passhash,8)
     user.passhash = string.replace("$2b$", "$2a$");
     console.log('saved');
     next();
    } catch (err) {
      console.log(err);
      return next(err);
  }

})


var User = mongoose.model('vmq_acl_auth', UserSchema);
module.exports = User;
