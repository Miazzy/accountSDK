import '../common/polyfill'
import render from "./render"
import event from './event'

const login = (options = {}) => {
    const defaultOpts = {
        loginBtnText: '登录',
        userLabel: '',
        userPlaceHolder: '请输入手机号/邮箱',
        pwdLabel: '',
        pwdPlaceHolder: '请输入密码',
        showRemember: true,
        autocomplete: false,
    }

    const opts = Object.assign(defaultOpts, options)

    render(opts)
    event(opts)
}

export { login }