const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const shortid = require('shortid');
const session = require('express-session');
var db = require('./db');

var flash = require('express-flash-messages');

var userRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');
var productRoute = require('./routes/product.route');
var sessionMiddleware = require('./middlewares/session.middleware');
var cartRoute = require('./routes/cart.route');

var authMiddleware = require('./middlewares/auth.middleware');

// var db = require('./db')

const express = require('express');
const { use } = require('./routes/user.route');
const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.set('trust proxy', 1) // trust first proxy


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());
app.use(cookieParser('qweqweqweqasdasd123')); 
app.use(sessionMiddleware);

app.use(express.static('public'));

app.use(flash());

//sử dụng session để kiểm tra login
app.use(session({
  secret: 'mySecretKey',
  resave: true,
  saveUninitialized: false
}));

// let users = [
//   {id: 1, name: 'Socket'},
//   {id: 2, name: 'Warzone'},
//   {id: 3, name: 'Plaze'},
//   {id: 4, name: 'Levi'}
// ];

app.get('/', (req, res) => { //khi có get request gửi lên EndPoint thì sẽ gọi func nhận vào 2 tham số request và responsive
  let id = req.params.id;

  const user = db.get('users').find({ id: id}).value();
  res.render('index', {
    user: user
  });
 //request là client gửi lên, còn responsive là server trả về
});//index ở đây là truyền vào cái path của views có tên file là index.pug

app.get('/api', (req,res)=> {
  const data= req.query.key;
  res.status(200).json({data:data});
});

app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);
app.use('/products', productRoute);
app.use('/cart', cartRoute);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
