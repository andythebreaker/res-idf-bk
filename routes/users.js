var express = require('express');
var router = express.Router();
var multer = require('multer');
const storage = multer.memoryStorage();
var upload = multer({ storage: storage, limits: { /*fields: 1, */fileSize: 6000000, files: 1/*, parts: 2 */ } });
var empty = require('is-empty');
var Isemail = require('isemail');
var isEqual = require('is-equal');
var passport = require('passport');
var sanitizer = require('sanitizer');
var LocalStrategy = require('passport-local').Strategy;
var randomstring = require("randomstring");

const sharp = require('sharp');

//import Data Model
var User = require('../models/user');

//var loginpageloadtimeoutverification = require('../models/loginpageloadtimeoutverification');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

//加入register routing
/*router.get('/register', function (req, res, next) {
  res.render('register', { title: 'Register' });
});*/

//加入login routing
router.get('/login', function routergetlogin(req, res, next) {
  if (!req.user) {
    res.render('login', {
      var_use_old_jquery: true,
      //successes: randomstringgenerate100,
      var_jade_err_msg_show: false,
      var_jade_error_msg_gui_text_1: "X",
      var_jade_error_msg_gui_text_2: "X",
      do_you_want_to_log_in_or_register: "0"
    });
  } else {
    res.redirect('/main');
  }
});

//POST request to register
router.post('/register', upload.single('profileimage'), function (req, res, next) {
  if (process.env.ABLE_NEW_ACCOUNT==='yes') {//console.log(req.body);
    //console.log(req.file.buffer.toString('base64'));
    //var profileimage = req.file.buffer.toString('base64');
    var profileimage;
    //using multer
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;

    console.log(name);
    console.log(email);
    console.log(username); //console.log(password); console.log(password2);

    if (Array.isArray(password)) {
      password = password[0];
    }

    var error_msg_res = {};

    if (name.length > 8)
      name = name.substr(0, 8)

    User.getUserByUsername(username, function (err, user) {//檢查是否重複
      if (user) {
        error_msg_res["id_error"] = "Account name already exists";
      }

      //Form Validator
      if (empty(name)) {
        error_msg_res["name"] = "empty";
      }
      if (!Isemail.validate(email)) {
        error_msg_res["email"] = "UNvalidate";
      }
      if (empty(username)) {
        error_msg_res["username"] = "empty";
      }
      if (empty(password)) {
        error_msg_res["password"] = "empty";
      }
      if (!isEqual(password, password2)) {
        error_msg_res["password2"] = "neq";
      }
      if (!req.file) {
        error_msg_res["req.file"] = "empty";
      }

      console.log(error_msg_res);
      if (!empty(error_msg_res)) {
        res.render('login', {
          var_use_old_jquery: true,
          var_jade_err_msg_show: true,
          var_jade_error_msg_gui_text_1: "錯誤",
          var_jade_error_msg_gui_text_2: JSON.stringify(error_msg_res),
          do_you_want_to_log_in_or_register: "0"
        });
      } else {

        const img = req.file.buffer;
        const image = sharp(img);
        image
          .metadata()
          .then(metadata => {
            return image
              .resize({
                width: 50,
                height: 50,
                fit: sharp.fit.cover,
              })
              .toBuffer();
          })
          .then(data => {
            profileimage = "data:image/jpeg;base64," + data.toString('base64');

            var newUser = new User({
              name: name,
              email: email,
              username: username,
              password: password,
              profileimage: profileimage
            });

            User.createUser(newUser, function (err, user) {
              //track for error
              if (err) throw err;
              console.log(user);
            });
            //Show success message with flash
            /*req.flash('success', 'You are now registered and can login');
            res.location('/');
            res.redirect('/');*/
            res.render('login', {
              var_use_old_jquery: true,
              var_jade_err_msg_show: false,
              var_jade_error_msg_gui_text_1: "提示訊息",
              var_jade_error_msg_gui_text_2: "註冊成功",
              do_you_want_to_log_in_or_register: "-1"
            });
          })
          .catch(err => { throw err; });
      }
    });
  } else {
    return res.status(400).send("leave, you don't belong here");
  }
});

passport.use(new LocalStrategy(function (username, password, done) {
  //compare username
  User.getUserByUsername(username, function (err, user) {
    if (err) throw err;
    if (!user) {
      return done(null, false, { message: 'Unknown User' });
    }
    //compare password
    User.comparePassword(password, user.password, function (err, isMatch) {
      if (err) throw err;
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Invalid Password' });
      }
    });
  });
}));

//加入 passport 驗證
//序列化
passport.serializeUser(function (user, done) {
  done(null, user.id);
});
//繼續加入 session
//反序列化
passport.deserializeUser(function (id, done) {
  User.getUserById(id, function (err, user) {
    done(err, user);
  });
});

//加入login的HTTP POST request
//POST request to login
router.post('/login',
  /*passport.authenticate('local', { failureRedirect: '/users/login', failureFlash: 'Invalid username or password' }),
  function (req, res) {

    res.status(200).send("/main");
  }*/function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.redirect('/users/login'); }
      console.log(user);
      req.logIn(user, function (err) {
        if (err) { return next(err); }
        return res.status(200).send("/main");
      });
    })(req, res, next);
  });

router.get('/logout', function (req, res) {
  console.error("logout!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  req.logout();
  res.redirect('/users/login');
});

module.exports = router;