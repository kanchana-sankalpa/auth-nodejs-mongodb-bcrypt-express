var User = require('../models/user');
console.log('user');

exports.getRoot = async (req, res, next) => {
  try {
    return res.sendFile(path.join(__dirname + '/template/index.html'));
} catch (err) {
  console.log(err);
  return res.status(500);
}
};


exports.postRoot = async (req, res, next) => {
  try {
    if (req.body.passhash !== req.body.passwordConf) {
      var err = new Error('Passwords do not match.');
      err.status = 400;
      res.send("passwords dont match");
      return next(err);
    }
    if (req.body.email &&
      req.body.client_id &&
      req.body.passhash &&
      req.body.passwordConf) { // for register
  
      var userData = {
        email: req.body.email,
        client_id: req.body.client_id,
        username: req.body.client_id,
        passhash: req.body.passhash,
        passwordConf: req.body.passwordConf,
      }
    try{
      const user = await User.create(userData);
      //req.session.userId = user._id;
      return res.redirect('/profile/'+user._id);
    } catch (err) {
      console.log(err);
      return res.status(401);
  }
  
  
    } else if (req.body.logemail && req.body.logpassword) { // for login
   
      try{
        const user = await User.authenticate(req.body.logemail, req.body.logpassword);
       // req.session.userId = user._id;
        return res.redirect('/profile/'+user._id);
    } catch (err) {
      console.log(err);
      var err = new Error('Wrong email or password.');
      err.status = 401;
      return next(err);
  }
  
    } else {
      var err = new Error('All fields required.');
      err.status = 400;
      return next(err);
      //return res.status(400);
    }

} catch (err) {
  console.log(err);
  return res.status(500);
}
};


//router.get('/profile',
// GET route after registering
exports.getprofile = async (req, res, next) => {
  console.log(req.params.userid);
  const user = await User.findById(req.params.userid);
  try {
    if (user === null) {
      var err = new Error('Not authorized! Go back!');
      err.status = 400;
      return next(err);
    } else {
      return res.send('<h1>Name: </h1>' + user.client_id + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
    }

} catch (err) {
  console.log(err);
  return next(error);
}
}
/*
router.get('/profile', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
          return res.send('<h1>Name: </h1>' + user.client_id + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
        }
      }
    });
});
*/
/*
// GET for logout logout
router.get('/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});
*/