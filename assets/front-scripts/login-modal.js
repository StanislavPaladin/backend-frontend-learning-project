import adminCheck from "./checkIsAdmin.js"

function loginModalController() {
    /**логин  */
    const loginModalTrigger = document.getElementById('login-modal-trigger');
    const loginModal = document.querySelector('#login-modal');
    const body = document.querySelector('body');
    let input = document.querySelector('.search-input');
    let sendForm = document.querySelector('#send-login-form');
    let emailField = document.getElementById('login-email');
    let passwordField = document.getElementById('login-password')

    body.addEventListener('click', function (e) {
        let target = e.target;

        if (target.matches('#login-modal-trigger')) {
            e.preventDefault();
            adminCheck();
            loginModal.classList.add('show')
        } else if (target.matches('#login-modal')) {
            loginModal.classList.remove('show')
            //logout
        } else if (target.matches('#logout')) {
            e.preventDefault();
            if (localStorage.token) {
                const loginInfo = document.getElementById('login-info')
                localStorage.removeItem('token');
                localStorage.removeItem('name');
                localStorage.removeItem('id');
                loginInfo.classList.add('warning');
                loginInfo.textContent = 'Вы вышли из учётной записи';
                setTimeout(hideInfo, 2000);
                adminCheck();
            } else {
                const loginInfo = document.getElementById('login-info')
                loginInfo.classList.add('warning');
                loginInfo.textContent = 'Вы не авторизованы';
                setTimeout(hideInfo, 2000);
                adminCheck();
            }

        }
    })



    sendForm.addEventListener('click', async function () {

        if (!$) $ = jQuery;
        let form = $("#login-modal-wrapper"); // чтобы не переопределить что-то глобальное
        let formWrapper = form.parent();
        let email = emailField.value;
        let password = passwordField.value;
        let token = localStorage.getItem('token')
        let user = JSON.stringify({
            password: password,
            email: email,
            sessionToken: token
        });
        let request = new XMLHttpRequest();
        request.open("POST", "/auth/login", true);
        request.setRequestHeader("Content-Type", "application/json");
        request.addEventListener("load", function () {
            // получаем и парсим ответ сервера
            let receivedUser = JSON.parse(user);
            if (localStorage.token) { //если в локалсторейдж есть токен - юзер авторизован
                const loginInfo = document.getElementById('login-info')
                loginInfo.classList.add('warning');
                loginInfo.textContent = 'Вы уже авторизованы';
                setTimeout(hideInfo, 2000);
            } else { //если нет токена - проводим процедуру авторизации
                if (request.status == 400) {
                    const loginInfo = document.getElementById('login-info')
                    loginInfo.classList.add('error');
                    let res = JSON.parse(request.response);
                    loginInfo.textContent = Object.values(res);
                    delete localStorage.token;
                    setTimeout(hideInfo, 2000)
                } else if (request.status == 403) { //обработка запроса, когда уже залогиненный пользователь пытается залогиниться снова
                    const loginInfo = document.getElementById('login-info')
                    loginInfo.classList.add('warning');
                    loginInfo.textContent = 'Вы уже авторизованы';
                    setTimeout(hideInfo, 2000);
                    adminCheck();
                } else if (request.status == 200) {
                    const loginInfo = document.getElementById('login-info')
                    loginInfo.classList.add('success');
                    loginInfo.textContent = 'Авторизация прошла успешно';
                    let res = JSON.parse(request.response);
                    localStorage.setItem('token', Object.values(res));
                    localStorage.setItem('name', email);
                    // localStorage.setItem('id', id)
                    loginModal.classList.remove('show')
                    setTimeout(hideInfo, 2000)
                    /* очищение полей юзернейм и пароль*/
                    emailField.value = '';
                    passwordField.value = '';
                    adminCheck();
                    setTimeout(hideInfo, 2000);
                }
            }

        });
        request.send(user);
        hideInfo();
    })

    function hideInfo() {
        const loginInfo = document.getElementById('login-info')
        const classes = ['error', 'success', 'warning'];
        loginInfo.classList.remove(...classes);

    }
}



document.addEventListener("DOMContentloaded", loginModalController())