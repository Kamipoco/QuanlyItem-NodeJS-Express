var db = require('../db')

module.exports.index = function(req, res) {
    //begin = (n-1)*x
    //end = n*x
    let page = parseInt(req.query.page) || 1;  //là n
    let perPage = 8; //là x, mỗi trang gồm 8 sản phẩm
    let begin = (page - 1)*perPage; // điểm đầu
    let end = page*perPage; //điểm cuối

    let prevPage = page - 1; 
    let nextPage = page + 1;

    res.render('products/index', {
        products: db.get('products').value().slice(begin, end), //value() chuyển dữ liệu về dạng object
        page: page,
        prevPage: prevPage,
        nextPage: nextPage
    });
};

module.exports.search = function(req, res) {
    let q = req.query.q;
    let matchedProduct = db.get('products').value().filter( function(product) {
      return product.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;//chuyển hết về chữ thường rồi so sánh
   
    });
    if(!q){
      res.redirect('/products');
    } else {
      res.render('../views/products/index', {
        products: matchedProduct,
        keyword: q
      });
    }
  };