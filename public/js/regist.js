/**
 * Created by Administrator on 2017/9/1.
 */
$(()=>{
    var notice = $('.notice');

    $('.regist-btn').on('click',()=>{
        // var username = $('[name=name]').val();
        // var passwd = $('[name=password]').val();
        // var repasswd = $('[name=repassword]').val();
        // notice.text('');
        // if(username == '') {
        //     return notice.text('用户名不能为空');
        // }else if(username.length > 16) {
        //     return notice.text('用户名不能超过16位')
        // } else if(new RegExp(/^\d+$/).test(username)) {
        //     return notice.text('用户名不能为纯数字')
        // }else if(passwd == '') {
        //     return notice.text('密码不能为空')
        // } else if(passwd != repasswd) {
        //     return notice.text('两次密码输入不一致');
        // } else {
        //     //notice.text('注册成功').css({'color':'#0f0'})
        // }
    })
});