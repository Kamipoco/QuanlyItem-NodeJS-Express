const shortid = require('shortid');
var db = require('../db')

module.exports = function(req, res, next) {
    
    if(!req.signedCookies.sessionId) {
        let sessionId = shortid.generate();
        res.cookie('sessionId', sessionId, {//nếu chưa có ID thì nó sẽ tạo ra 1 chuỗi ngẫu nhiên
            signed: true
        });

        db.get('sessions').push({
            id: sessionId
        }).write();
    }

    next();
}