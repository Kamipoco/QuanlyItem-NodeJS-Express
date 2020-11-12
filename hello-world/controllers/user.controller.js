var db = require('../db');
const shortid = require('shortid');
const { render } = require('pug');
const { value } = require('../db');

module.exports.index = (req, res) => {
    const users = db.get('users').value(); 
    res.render('users/index',{
          //key và value
          users: users,         
      });
  };

module.exports.search = function(req, res) {
    let q = req.query.q;
    let matchedUser = db.get('users').value().filter( function(user) {
      return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;//chuyển hết về chữ thường rồi so sánh
   
    });
    // console.log(matchedUser);
    if(!q){
      res.redirect('/users');
    } else {
      res.render('../views/users/index', {
        users: matchedUser,
        keyword: q
      });
    }
  };

module.exports.create = function(req, res) {
  // console.log(req.cookies);
    res.render('users/create');
  };

module.exports.get = function(req, res) {  //View User
    let id = req.params.id; //Nếu id là kiểu số vs string thì chuyển hết về int để so sánh
 
   const viewUser = db.get('users').find({ id: id}).value();
  //  console.log(viewUser);
   res.render('users/view', {
     viewUser: viewUser,
   });
 };

module.exports.postCreate = function(req, res) {
    req.body.id = shortid.generate();
    req.body.avatar = req.file.path.split('\\').slice(1).join('/'); //win thì xài cái này
    //req.file.path.split('/').slice(1).join('/');   cái này đối với ubuntu or mac

    db.get('users').push(req.body).write();
    res.redirect('/users');
  };


