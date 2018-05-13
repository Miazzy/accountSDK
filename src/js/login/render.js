const template = (opts = {}) => {
    const autoTpl = `
    <div id="no-autocomplete">
      <input type="text">
      <input type="password">
    </div>
  `

    const autocompleteAdapter = opts.autocomplete ? '' : autoTpl;
    const autocompleteValue = opts.autocomplete ? 'on' : 'off';
    const showRemember = opts.showRemember ? 'block' : 'none';

    const tpl = `
    <div id="login-wrapper">
        <p id="login-error" class="login-error"></p>

        <form id="login-form" onsubmit="return false">
            ${autocompleteAdapter}
            <label class="login-account-wrapper">
              <span class="account-label">${opts.userLabel}</span>
              <input type="text" id="login-account" valid="present" name="account" placeholder="${opts.userPlaceHolder}" autocomplete="${autocompleteValue}">
              <span id="clear-account" class="del"></span>
            </label>

            <label class="login-password-wrapper">
              <span class="password-label">${opts.pwdLabel}</span>
              <input type="password" id="login-password" valid="present" name="password" placeholder="${opts.pwdPlaceHolder}" autocomplete="${autocompleteValue}">
            </label>

            <label class="login-remember-wrapper" style="display: ${showRemember}">
              <input type="checkbox" id="login-remember" class="login-remember" name="remember">
              <span>记住密码</span>
            </label>

            <input id="login-btn" class="login-btn" type="submit" value="${opts.loginBtnText}">
        </form>

        <div class="login-extra-wrapper">
          <a href="forget.html">忘记密码</a>
          <a href="register-mobile.html">免费注册</a>
        </div>
    </div>
  `
    return tpl;
}

export default (conf = {}) => {
    conf.container.innerHTML = template(conf)
    let $noAutocomplete = document.getElementById("no-autocomplete")
    if ($noAutocomplete) {
        $noAutocomplete.style.opacity = '0'
        $noAutocomplete.style.height = '0'
    }
}