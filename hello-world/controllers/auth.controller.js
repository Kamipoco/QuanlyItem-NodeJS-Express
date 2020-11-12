var db = require('../db');
var flash = require('express-flash-messages');
const session = require('express-session');

module.exports.login = (req, res) => {
    res.render('auth/login');
  };

  module.exports.postLogin = (req, res) => {
      let email = req.body.email;
      let password = req.body.password;
      let user = db.get('users').find({ email: email}).value();

      if(!req.body.email && !req.body.password) {
        res.render('auth/login', {
            errors: [
                'Email is required!',
                'Password is required!'
            ],
            values: req.body
        });
        return;
      } 

      if(!req.body.email) {
        res.render('auth/login', {
            errors: [
                'Email is required!'
            ],
            values: req.body
        });
        return;
      } 

      if(!req.body.password) {
        res.render('auth/login', {
            errors: [
                'Password is required!'
            ],
            values: req.body
        });
        return;
      } 

      if(!user) {
        res.render('auth/login', {
            errors: [
                'Email or password is incorrect'
            ],
            values: req.body
        });
        return;
      }


      if(user.password !== password) {
        res.render('auth/login', {
            errors: [
                'Incorrect password'
            ],
            values: req.body
        });
        return;
      }

      res.cookie('userID', user.id, { signed: true});
      res.redirect('/');
  };

module.exports.logout = (req, res, next) => {
        if (req.session) {
            // delete session object
            req.session.destroy(function(err) {
                if(err) {
                    return next(err);
                } else {
                    return res.redirect('/');
                }
            });
        }
};
