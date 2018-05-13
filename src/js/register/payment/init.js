import '../../common/polyfill'
import render from './render'
import event from './event'
import utils from '../../common/utils'

const regPayment = (options = {}) => {
    const defaultOpts = {
        paymentPlaceHolder: '请输入您的支付账号',
        paymentPasswordPlaceHolder: '请输入您的支付密码'
    }

    var opts = Object.assign(defaultOpts, options)

    render(opts)
    event(opts)
}

export { regPayment }