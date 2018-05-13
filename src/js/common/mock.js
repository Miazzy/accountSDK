import FetchMock from 'fetch-mock'
import regionData from './data/region-data.js'

FetchMock.mock('/login', (url, opts) => {
    const params = opts.params
    if (params.account === '17865358265') {
        if (params.password === 'imooc') {
            return {
                code: 200,
                message: 'success'
            }
        } else {
            return {
                code: 401,
                message: '密码错误'
            }
        }
    } else {
        return {
            code: 400,
            message: '用户名错误'
        }
    }
});

FetchMock.mock('/getMobileVerifyToken', (url, opts) => {
    return {
        code: 200,
        message: 'success',
        mobileVerifyToken: 'dj980801'
    }
});

FetchMock.mock('/register/getVerifyCode', (url, opts) => {
    const params = opts.params;
    return {
        code: 200,
        message: 'success',
        mobile: params.mobile
    };
});

FetchMock.mock('/register/mobile', (url, opts) => {
    const params = opts.params;
    if (params.verifyCode === '123456') {
        return {
            code: 200,
            message: 'success'
        }
    } else {
        return {
            code: 400,
            message: 'invalid verifyCode'
        }
    }
});

FetchMock.mock('/region-data', {
    code: 200,
    message: 'success',
    data: regionData
})

FetchMock.mock('/register/info', {
    code: 200,
    message: 'success'
});

FetchMock.mock('/register/payment', {
    code: 200,
    message: 'success'
});

FetchMock.mock('/profile', {
    code: 200,
    message: 'success',
    data: {
        nickname: 'imooc',
        regionSting: '上海市静安区',
        regionCode: '9,73,723',
        mobile: '17865358265',
        email: 'user@imooc.com',
        birthday: '2000-01-01',
        realname: '慕课',
        sex: 1
    }
});

FetchMock.mock('/address', {
    code: 200,
    message: 'success',
    data: [{
        name: '张三',
        regionSting: '北京市东城区',
        regionCode: '1,1,1',
        detailAddress: '和平北街334号',
        postalcode: '100000',
        mobile: 18512567389,
        telephone: '',
        addrId: 345
    },
    {
        name: '李四',
        regionSting: '上海市静安区',
        regionCode: '9,73,723',
        detailAddress: '和平北街334号',
        postalcode: '100000',
        mobile: 18517384387,
        telephone: '',
        addrId: 347
    }]
});

FetchMock.mock('/security-info', {
    code: 200,
    message: 'success',
    data: {
        nickname: 'Jie',
        mobile: '17865358263',
        email: 'root@qq.com',
        password: 1,
        identity: 1,
        secretQuestion: 0
    }
});

FetchMock.mock('*', (url, options) => {
    FetchMock.restore();
    return fetch(url, options);
});