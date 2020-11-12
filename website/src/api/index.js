import request from '@/utils/request'
/*
    登录
    account	是	string	员工账号
    password	是	string	密码
    captcha	否	string	验证码
*/
export function login(data) {
    return request({
        url: '/admin/login/login',
        method: 'post',
        data: data
    })
}