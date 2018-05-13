import utils from '../common/utils';
import { fetchPost } from '../common/fetch'
import FormCheck from '../common/form-check'

const {domSelector: $} = utils;

export default (opts) => {
    const $loginForm = $('#login-form');
    const $loginBtn = $('#login-btn');
    const $remember = $('#login-remember');
    const $clearAccount = $('#clear-account');
    const $account = $('#login-account');
    const $password = $('#login-password');
    const $error = $('#login-error');

    const formCheck = new FormCheck({
        form: document.getElementById('login-form')
    })

    $loginBtn.onclick = async() => {
        const checkResults = formCheck.check()

        if (!checkResults.length) {
            let remember = '0';
            if ($remember.getAttribute('checked')) {
                remember = '1'
            }
            let data = await fetchPost('/login', {
                account: $account.value,
                password: $password.value,
                remember: remember
            })

            if (data.code === 200) {
                opts.success & opts.success()
            } else {
                $error.innerHTML = data.message;
            }
        } else {
            const name = checkResults[0].name;
            const type = checkResults[0].type;
            if (type === 'present') {
                if (name === 'account') {
                    $error.innerHTML = '请填写您的用户名'
                } else if (name === 'password') {
                    $error.innerHTML = '请填写您的密码'
                }
            }
        }
    }

    $account.oninput = () => {
        if ($account.value.length) {
            $clearAccount.style.display = 'block'
        } else {
            $clearAccount.style.display = 'none'
        }

        $error.innerHTML = ''
    }

    $password.oninput = () => {
        $error.innerHTML = ''
    }

    $clearAccount.onclick = () => {
        $account.value = ''
        $clearAccount.style.display = 'none'
    }
}