var crypto = require('crypto'),
    User = require('../models/user.js');
module.exports = function (app) {
  app.get('/', function (req, res) {
    res.render('index',{title:'Express'})
  });

  app.get('/login', function (req, res) {
    res.render('login',{title:'Express'})
  });

  app.get('/regist', function (req, res) {

    res.render('regist',{title:'Express'})
  });

  app.post('/regist', function (req, res) {

    var name = req.body.name,
        password = req.body.password,
        password_re = req.body['password-repeat'];
    if(password != password_re) {
      //req.flash('error','两次输入的密码不一致');
      return res.redirect('/regist');
    }
  });

  app.get('/post', function (req, res) {
    res.render('post',{title:'Express'})
  });


// catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

// error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
};