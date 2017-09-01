var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes');

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var config = require('config-lite')(__dirname);
var formidable = require('express-formidable');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// app.use(flash());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  name: config.session.key,
  secret: config.session.secret, // 通过secret计算哈希值放在cookie
  resave: true, //强制更新session
  saveUninitialized: false, //强制创建一个session, 即使用户未登录
  cookie: {
    maxAge: config.session.maxAge
  },
  store: new MongoStore({ //将session存储到mongodb中
    url: config.mongodb
  })
}));

app.use(flash()); //flash必须在session之前加载;
app.use(function (req, res, next) {
  // app.xxx 或 res.xxx 的变量都会传值express模res替换模板中的 xxx
  // app.locals 应用整个生命周期有效
  // res.locals 只在当前请求中有效
  res.locals.user = req.session.user;
  res.locals.success = req.flash('success').toString();
  res.locals.error = req.flash('error').toString();
  next();
});

app.use(formidable({
  uploadDir: path.join(__dirname,'public/avatar'),
  keepExtensions: true
}));

routes(app);

app.listen(3000, function() {
  console.log('Express server listening on port ' + 3000);
});

module.exports = app;
