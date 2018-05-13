import '../common/polyfill.js'
import render from './render.js'

const delivery = (options = {}) => {
    render(options)
}

export { delivery }