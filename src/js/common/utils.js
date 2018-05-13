const utils = {
    domSelector: (selector) => {
        return window.document.querySelector(selector)
    },

    hasClass(el, className) {
        let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
        return reg.test(el.className)
    },

    addClass(el, className) {
        if (!utils.hasClass(el, className)) {
            el.className += " " + className
        }
    },

    removeClass(el, className) {
        if (utils.hasClass(el, className)) {
            let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
            el.className = el.className.replace(reg, ' ')
        }
    },

    isArray(arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
    },

    getUrlParams: (key) => {
        const query = location.search.replace(/^\?/, '');
        let obj = {};
        query.split('&').map((item) => {
            let tmp = item.split('=');
            obj[tmp[0]] = tmp[1];
        })
        if (!key) {
            return obj;
        } else {
            return obj[key];
        }
    }
}

export default utils;