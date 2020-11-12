var express = require('express');

var router = express.Router();
var validate = require('../validate/user.validate');
var authMiddleware = require('../middlewares/auth.middleware');
var multer  = require('multer'); //giúp đọc dữ liệu mà người dùng gửi lên server

var upload = multer({ dest: './public/uploads/' })

var controller = require('../controllers/user.controller');

router.get('/', authMiddleware.requireAuth, controller.index);

// router.get('/cookie', function(req, res, next) {
//     res.cookie('user-id', 12345);
//     res.send('Hello-World!');
// });
  
router.get('/search', controller.search);
  
router.get('/create', controller.create);
  
router.post('/create', upload.single('avatar'), validate.postCreate, controller.postCreate); 
  
router.get('/:id', controller.get);

//    router.get('/back', function(req, res) {
//   //  res.redirect('/users');
//   res.render('users/index',{
//   users: db.get('users').value()     //key và value
//   });
//  });

module.exports = router;