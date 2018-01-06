var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

//list page
router.get('/test', function(req, res) {
  var db = req.db;
  var collection = db.get('foo');
  collection.find({},{},function(e, docs){
    res.render('test', {
      'userlist' : docs
    });
  });
});

//new user form
router.get('/new', function(req, res){
  res.render('new', {title: 'Add New User'});
});

//adding new user
router.post('/addnew', function(req, res){
  var db = req.db;
//get value

  var userName = req.body.username;
  var userEmail = req.body.useremail;
//grabbing out collection

  var collection = db.get('foo');

//adding to db
  collection.insert({
    "username": userName,
    "email": userEmail
  }, function(err, doc){
    if (err) {
      //error message
      res.send("Oops.")
    }
    else {
    res.redirect('test');
  }
    });
});

module.exports = router;
