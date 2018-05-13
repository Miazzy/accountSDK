import '../../common/polyfill'
import render from "./render"
import event from './event'

const regMobile = (options = {}) => {
    const defaultOpts = {
        mobilePlaceHolder: '请输入您的手机号'
    }

    const opts = Object.assign(defaultOpts, options)

    render(opts)
    event(opts)
}

export { regMobile }