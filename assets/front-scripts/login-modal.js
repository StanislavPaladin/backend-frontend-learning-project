function loginModalController() {
    const loginModalTrigger = document.getElementById('login-modal-trigger');
    const loginModal = document.querySelector('#login-modal');
    const body = document.querySelector('body');
    let input = document.querySelector('.search-input');
    let sendForm = document.querySelector('#send-login-form');
    let emailField = document.getElementById('login-email')
    let passwordField = document.getElementById('login-password')
    
    body.addEventListener('click', function (e) {
        let target = e.target;

        if (target.matches('#login-modal-trigger')) {
            loginModal.classList.add('show')
        } else if (target.matches('#login-modal')) {
            loginModal.classList.remove('show')
        }
    })



    sendForm.addEventListener('click', async function () {

        if (!$) $ = jQuery;
        let form = $("#login-modal-wrapper"); // чтобы не переопределить что-то глобальное
        let formWrapper = form.parent();
        let email = emailField.value;
        let password = passwordField.value;
        let token = localStorage.getItem('token')
        console.log(email, password);
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
            console.log(receivedUser);
            if (request.status == 400) {
                const loginInfo = document.getElementById('login-info')
                loginInfo.classList.add('error');
                let res = JSON.parse(request.response);
                loginInfo.textContent = Object.values(res);
                delete localStorage.token;
                setTimeout(hideInfo, 2000)
            } else if (request.status == 403) {  //обработка запроса, когда уже залогиненный пользователь пытается залогиниться снова
                const loginInfo = document.getElementById('login-info')
                loginInfo.classList.add('warning');
                loginInfo.textContent = 'Вы уже авторизованы';
                setTimeout(hideInfo, 2000);
            }
             else if (request.status == 200) {
                const loginInfo = document.getElementById('login-info')
                loginInfo.classList.add('success');
                loginInfo.textContent = 'Авторизация прошла успешно';
                let res = JSON.parse(request.response);
                localStorage.setItem('token', Object.values(res)) ;
                loginModal.classList.remove('show')
                setTimeout(hideInfo, 2000)
                /* очищение полей юзернейм и пароль*/ 
                emailField.value = '';
                passwordField.value = '';
            }
        });
        request.send(user);

    })
    function hideInfo () {
        const  loginInfo = document.getElementById('login-info')
        const classes = ['error', 'success', 'warning'];
        loginInfo.classList.remove(...classes);
        
    }
}
document.addEventListener("DOMContentloaded", loginModalController())