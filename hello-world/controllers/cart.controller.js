var db = require('../db');

module.exports.addToCart = function(req, res, next) {
    let productId = req.params.productId;
    let sessionId = req.signedCookies.sessionId;

    if(!sessionId) {
        res.redirect('/products');
        return;
    }

    var count = db.get('sessions').find({ id: sessionId}).get('cart.' + productId, 0).value(); //định nghĩa nó là 0 nếu chưa đc add

    db.get('sessions')
    .find({ id: sessionId})
    .set('cart.' + productId, count + 1) //nếu add vào bn lần thì nó sẽ cộng bấy nhiêu 
    .write();

    res.redirect('/products');
};

// let sessionId = req.signedCookies.sessionId;
// res.locals.countCart = db.get("sessions").find({ id: sessionId }).get("cart").size().value(); 