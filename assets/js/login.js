$(function () {
    //点击‘去注册账号’链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    
    //点击‘去登陆’链接
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    //自定义form注册规则
    var form = layui.form
    var layer = layui.layer
    form.verify({
        //自定义pwd校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        //验证两次密码是否一致
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return '两次密码输入不一致!'
            }
        }
    })

    //监听注册表单的提交事件
    $('#form-reg').on('submit', function (e) {
        e.preventDefault();
        //发起data请求
        var data = {
            username: $('#form-reg [name=username]').val(),
            password: $('#form-reg [name=password]').val(),
        }
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg('登陆失败/用户名已被占用');
            }
            layer.msg('注册成功!请登录!');
            //模拟触发点击事件
            $('#link_login').click()
            $('#form-login [name=username]').val('');
            $('#form-login [name=password]').val('');
        })
    })


    //监听登录成功提交事件
    $('#form-login').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            //获取表单内的数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败!')
                }
                layer.msg('登陆成功!')
                //把 token 保存到本地存储中
                localStorage.setItem('token', res.token);
                //跳转到主页面
                location.href = './login.html';
            }
        })
    })
})  