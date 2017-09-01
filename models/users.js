/**
 * Created by Administrator on 2017/8/31.
 */
var User = require('../lib/mongo').User;

module.exports = {
    create: function (user) {
        return User.create(user).exec();
    }
}