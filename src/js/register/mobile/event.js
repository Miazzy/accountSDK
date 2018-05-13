import utils from '../../common/utils';
import Slider from '../../common/slider.js';
import { fetchPost } from '../../common/fetch';
import FormCheck from '../../common/form-check';

const {domSelector:$, addClass, removeClass} = utils

export default (opts) => {
    let mobileVerifyToken;
    let checkResults;

    const $mobileInput = $('#register-mobile-input');
    const $verifyInput = $('#register-verify-input');
    const $verifyBtn = $('#register-verify-btn');
    const $mobileBtn = $('#register-mobile-btn');
    const $verifyMobile = $('#register-verify-mobile');
    const $dialog = $('#register-verify-dialog');
    const $dialogClose = $('#register-verify-dialog-close');
    const $verifySend = $('#verify-send');

    const formCheck = new FormCheck({
        form: document.getElementById('register-mobile-form')
    });

    const slider = new Slider({
        container: document.getElementById('register-verify-wrapper'),
        success: async($wrapper, $text) => {
            let data = await fetchPost('/getMobileVerifyToken', {})
            if (data.code === 200) {
                mobileVerifyToken = data.mobileVerifyToken
                addClass($wrapper, 'success')
                $text.innerText = '验证成功'
            } else {
                addClass($wrapper, 'failed')
                $text.innerText = '验证失败'
            }

            $verifyBtn.removeAttribute('disabled');
            removeClass($verifyBtn, 'disabled');
        }
    })

    $verifyBtn.onclick = async () => {
        checkResults = formCheck.check();

        if (checkResults.length) {
            const type = checkResults[0].type;
            if (type === 'present') {
                alert('请填写您的手机号');
            } else if (type === 'mobile') {
                alert('请填写正确的手机号');
            }
        } else {
            let data = await fetchPost('/register/getVerifyCode', {
                mobile: $mobileInput.value,
                mobileVerifyToken: mobileVerifyToken
            });
            if (data.code === 200) {
                $dialog.style.display = 'block';
                $verifyMobile.innerText = data.mobile;
                mobileVerifyToken = '';
                slider.reset();
            }
        }
    }

    $dialogClose.onclick = () => {
        $dialog.style.display = 'none';
        mobileVerifyToken = '';
        slider.reset();
    }

    $verifyInput.oninput = () => {
        const LENGTH = 6;
        let value = $verifyInput.value
        $verifyInput.value = value.replace(/\D/g, '');
        if ($verifyInput.value.length > (LENGTH - 1)) {
            $mobileBtn.removeAttribute('disabled');
            removeClass($mobileBtn, 'disabled');
            addClass($mobileBtn, 'btn-primary');
            if (value.length > LENGTH) {
                $verifyInput.value = value.substring(0, LENGTH)
            }
        } else {
            removeClass($mobileBtn, 'btn-primary');
            addClass($mobileBtn, 'disabled');
            $mobileBtn.setAttribute('disabled', 'disabled');
        }
    }

    $mobileBtn.onclick = async() => {
        let data = await fetchPost('/register/mobile', {
            mobile: $verifyMobile.innerText,
            verifyCode: $verifyInput.value,
            mobileVerifyToken: mobileVerifyToken
        })

        if (data.code === 200) {
            opts.success && opts.success();
        } else {
            alert('验证码错误')
        }
    }

    $verifySend.onclick = () => {
        let times = 60,
            timer = null;

        timer = setInterval(() => {
            $verifySend.value = times + '秒后重试';
            $verifySend.setAttribute('disabled', 'disabled');
            times--;
            if (times <= 0) {
                $verifySend.value = '发送验证码';
                $verifySend.removeAttribute('disabled');
                clearInterval(timer);
                times = 60;
            }
        }, 1000)
    }
}