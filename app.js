var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var expresshbs = require('express-handlebars');
var logger = require('morgan'); 
var session = require('express-session');
var flash = require('connect-flash');
var validator = require('express-validator');


var indexRouter = require('./routes/index');


var app = express();

// view engine setup
app.engine('.handlebars', expresshbs({
  defaultLayout: 'layouts',
  extname: '.handlebars'
}));
app.set('view engine', '.handlebars');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(validator());
app.use(cookieParser());
app.use(session({
  secret: 'sessionsecret',
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge : 180*60*1000}
}))
app.use(flash());


app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {

  res.locals.session =req.session;
  next();
})

app.use('/', indexRouter);

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


app.listen(5000,()=>{
  console.log('we are listening')
})
module.exports = app;