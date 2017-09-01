/**
 * Created by Administrator on 2017/8/31.
 */
module.exports = {
    checkLogin: function (req, res, next) {
        if(!req.session.user) {
            req.flash('error','未登录');
            return res.redirect('/login')
        }
        next();
    },

    checkNotLogin: function (req, res, next) {
        if(req.session.user) {
            return res.redirect('back');
        }
        next();
    }
}