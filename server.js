if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
const express = require('express');
const web3 = require('web3');
const bodyParser = require('body-parser');
const app = express();
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const sequelize = require('./database');
const initializePassport = require('./passport-config');

initializePassport(passport)

sequelize.sync().then(() => console.log('db is ready'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(__dirname + '/public'));
app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  name: 'SID',
  unset: 'destroy'
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res,next){
  res.locals.currentUser = req.user;
  next();
})
app.set('view engine', 'ejs');

app.get('/', (req,res) => {
        res.render('\home',{ isLoggedIn: req.isAuthenticated() });
});


app.get('/config',checkAuthenticated, (req,res) => {
        res.render('\config',{ isLoggedIn: req.isAuthenticated() });
});

app.get('/login', checkNotAuthenticated, (req,res) => {
        res.render('\login',{ isLoggedIn: req.isAuthenticated()});
});

app.post('/login', checkNotAuthenticated, passport.authenticate('local',
{
    successRedirect: '/config',
    failureRedirect: '/login',
    failureFlash: true
}));

app.post('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/')
  }
  
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next()
  }

app.listen(4000,()=>{
    console.log("Running on http://localhost:4000");
});
