var express = require('express');
var router = express.Router();

// Get Homepage
router.get('/', ensureAuthenticated, function (req, res) {
  res.render('index', {username: req.user.username });
});

router.get('/chemist',function(req,res) {
  res.render('chemist');
});

router.get('/doctor',function(req,res) {
  res.render('doctor');
});

router.get('/patient',function(req,res) {
  res.render('patient');
});

router.get('/overview',function(req,res) {
  res.render('overview');
});

router.get('/researcher',function(req,res) {
  res.render('researcher');
});


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    //req.flash('error_msg','You are not logged in');
    res.redirect('/users/login');
  }
}

module.exports = router;
