import utils from '../../common/utils'
import { fetchPost } from '../../common/fetch'
import FormCheck from '../../common/form-check';

const {domSelector:$} = utils

export default (opts) => {
    const $form = $('#register-payment-form');
    const formCheck = new FormCheck({
        form: $form
    });

    $form.onsubmit = async(e) => {
        e.preventDefault();
        let checkResults = formCheck.check();
        let formValue = {}
        Array.from($form.elements).forEach(item => {
            if (item.name) {
                formValue[item.name] = item.value
            }
        })

        if (checkResults.length) {
            const type = checkResults[0].type;
            if (type === 'present') {
                alert('请填写您的账户');
            }
        } else {
            let data = await fetchPost('/register/payment', formValue);
            if (data.code === 200) {
                opts.success && opts.success()
            }
        }
    }
}