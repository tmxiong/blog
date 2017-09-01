/**
 * Created by Administrator on 2017/8/31.
 */
var fs = require('fs');
var path = require('path');
var sha1 = require('sha1');
var express = require('express');
var router = express.Router();

var UserModal = require('../models/users');
var check = require('../middlewares/check');

// 这里的路由不能写成 `/regist`, 因为上一级已经写了 `/regist`
router.get('/', function (req, res, next) {
    res.render('regist');
});

router.post('/', function (req, res, next) {
    var username = req.fields.name;
    var passwd = req.fields.password;
    var repasswd = req.fields.repassword;
    var avatar = '../public/avatar/default_avatar.png';

    try{

        if(username == '') {
            throw new Error('用户名不能为空');
        }else if(username.length > 16) {
            throw new Error('用户名不能超过16位')
        } else if(new RegExp(/^\d+$/).test(username)) {
            throw new Error('用户名不能为纯数字')
        }else if(passwd == '') {
            throw new Error('密码不能为空')
        } else if(passwd != repasswd) {
            throw new Error('两次密码输入不一致');
        } else {
            //notice.text('注册成功').css({'color':'#0f0'})
        }

    }catch (e) {
        req.flash('error',e.message);
        return res.redirect('/regist');

    }

    // 明文密码加密
    passwd = sha1(passwd);


    var user = {
        name: username,
        password: passwd,
        gender: 'x', // 'm'/'f'/'x'
        bio: '这个家伙还没来得急写签名',
        avatar: avatar
    };
    UserModal.create(user)
        .then((result)=>{
            user = result.ops[0];
            delete user.password;
            req.session.user = user;

            req.flash('success','注册成功');
            res.redirect('/home')
        })

});
module.exports = router;