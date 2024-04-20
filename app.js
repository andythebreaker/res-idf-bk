var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var RateLimit = require('express-rate-limit');
var session = require('express-session');
var randomstring = require("randomstring");
const { body, validationResult } = require('express-validator');
const robots = require('express-robots-txt');
var minifyHTML = require('express-minify-html-2');
var flash = require('connect-flash');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var debug = require('debug')('libraryofficialwebsite:app');
const { printTable } = require('console-table-printer');
const { Base64 } = require('js-base64');
var token = require('token');
const jsonwebtoken = require('jsonwebtoken');


/**
 * Random Security Code Generation Calculation
 */
token.defaults.secret = process.env.token_defaults_secret;
token.defaults.timeStep = 5 * 60; //5min
async function verifyJWT(jwt) {
  if (!jwt) {
    return Promise.reject(new Error('No JWT'));
  }
  const decoded = jsonwebtoken.verify(jwt, process.env.token_defaults_secret);
  return decoded;
}

var limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60 * 1000 * 1000 //1000*1000/1sec max
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mainRouter = require('./routes/main');
var toolRouter = require('./routes/tool');
var uploadRouter = require('./routes/upload');

var app = express();
var expressWs = require('express-ws')(app);
//console.log(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json({ limit: 10485760 }));//rest-payload-10mb-max
app.use(express.urlencoded({ extended: false, limit: 10485760 }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));
// Handle Sessions
app.use(session({
  secret: randomstring.generate(100),
  saveUninitialized: true,
  resave: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(limiter);
require('express-file-logger')(app, {
  showOnConsole: false,
  bodyDetails: false
})//express log to file
app.use(minifyHTML({
  override: true,
  exception_url: false,
  htmlMinifier: {
    removeComments: true,
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    removeAttributeQuotes: true,
    removeEmptyAttributes: true,
    minifyJS: true
  }
}));

var ws_implement = null;
app.set_ws_implement = function (stuff) {
  ws_implement = stuff;
}
var ws_debug_220328 = true;
function ws_debug_BruteForceTest(params) {
  if (ws_debug_220328) {
    //Create a table
    const err_msg = [
      { ws_debug_220328: String(params) }];

    //print
    printTable(err_msg);
  }
}
var mp4upload = require('./models/mp4Ulogic');
app.ws('/websocket', function (ws, req) {
  if (req.isAuthenticated()) {
    ws.on('message', function (data) {
      try {
        mp4upload.input(data, (stuff) => {
          ws.send(stuff);
        });
      } catch (error) {
        console.log("🚀 ~ file: app.js ~ line 118 ~ error", error)
        ws.send(error);
        ws.close();
      }
    });
  } else {
    ws.on('message', function (data) {
      if (data) {
        try {
          var dd = Base64.decode(data);
          var try_catch_F_go = true;
          var sd = null;
          try {
            sd = JSON.parse(dd);
          } catch (JSON_parse_error) {
            //Create a table
            const err_msg = [
              { mistake: '148@bin/wwwcopy.mjs', message: String(JSON_parse_error), handled_properly: "You don't need to worry about this error" }];
            //print
            printTable(err_msg);
            try_catch_F_go = false;
          } finally {
            if (try_catch_F_go) {

              var tf = token.verify(sd.id + '|' + sd.role, sd.auth);

              var ht = Base64.decode(sd.id);

              var tm = Base64.decode(sd.role);

              verifyJWT(tm)
                .then(decoded => {

                  if (tf && decoded.stuff === ht) {

                    try {
                      //這一行的前後都是依些驗證的東西，主邏輯是這行
                      ws_implement.ws_msg_income_obj(decoded.stuff, (the_return_object_of_the_module_that_actually_handles_the_WS) => {
                        ws.send(the_return_object_of_the_module_that_actually_handles_the_WS);
                      });
                    } catch (error_of_ws) {
                      console.log(error_of_ws);
                    }
                  }
                })
                .catch(() => {
                  try {
                    ws.send('解析失敗!');
                  } catch (error_of_ws) {
                    console.log(error_of_ws);
                  }
                });
            } else {

            }
          }
        } catch (error) {
          console.log(error);
          try {
            ws.send('解析失敗!');
          } catch (error_of_ws) {
            console.log(error_of_ws);
          }
        }
      } else {
        try {
          ws.send('解析失敗!');
        } catch (error_of_ws) {
          console.log(error_of_ws);
        }
      }
    });
  }
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/main', mainRouter);
app.use('/tool', toolRouter);
app.use('/upload', uploadRouter);
app.use(robots({
  UserAgent: '*',
  Disallow: ['/users/login', '/main'],//allow every things
  CrawlDelay: '5',
  Sitemap: 'https://library.math.ncku.edu.tw/sitemap.xml',
}))

//get/post
app.get('*', function (req, res, next) {
  //console.log((!req.user) ? "[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[nouser]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]" : req.user);
  res.locals.user = req.user || null;
  next();
});

app.post(
  '/user',
  body('username').isEmail(),
  body('password').isLength({ min: 5 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.create({
      username: req.body.username,
      password: req.body.password,
    }).then(user => res.json(user));
  },
);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//Create a table
const start_msg = [
  { start_message: 'app.js start!' }];

//print
printTable(start_msg);

module.exports = app;

/*TODO
package json sort按字母排序
*/