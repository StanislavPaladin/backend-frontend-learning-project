function registrationModalController() {
    const registrationModalTrigger = document.getElementById('registration-modal-trigger');
    const registrationModal = document.querySelector('#registration-modal');
    const body = document.querySelector('body');
    let input = document.querySelector('.search-input');
    let sendForm = document.querySelector('#send-registration-form');
    let emailField = document.getElementById('registration-email')
    let passwordField = document.getElementById('registration-password')

    body.addEventListener('click', function (e) {
        let target = e.target;

        if (target.matches('#registration-modal-trigger')) {
            registrationModal.classList.add('show')
        } else if (target.matches('#registration-modal')) {
            registrationModal.classList.remove('show')
        }
    })



    sendForm.addEventListener('click', async function () {

        if (!$) $ = jQuery;
        let form = $("#registration-modal-wrapper"); // чтобы не переопределить что-то глобальное
        let formWrapper = form.parent();
        let email = emailField.value;
        let password = passwordField.value;
        console.log(email, password);
        let user = JSON.stringify({
            password: password,
            email: email,
        });
        let request = new XMLHttpRequest();
        request.open("POST", "/auth/registration", true);
        request.setRequestHeader("Content-Type", "application/json");
        request.addEventListener("load", function () {
            // получаем и парсим ответ сервера
            let receivedUser = JSON.parse(user);
            console.log(receivedUser);
            if (request.status == 400) {
                const registrationInfo = document.getElementById('registration-info')
                registrationInfo.classList.add('error');
                let res = JSON.parse(request.response);
                if(res.errors) {
                    let errorsArray = res.errors.errors;
                    registrationInfo.textContent = errorsArray.map(item =>item.msg);
                }
                setTimeout(hideInfo, 2000)
            } else if (request.status == 403) {  //обработка запроса, когда уже залогиненный пользователь пытается залогиниться снова
                const registrationInfo = document.getElementById('registration-info')
                registrationInfo.classList.add('warning');
                registrationInfo.textContent = 'Эта почта уже используется';
                setTimeout(hideInfo, 2000);
            }
            else if (request.status == 200) {
                const registrationInfo = document.getElementById('registration-info')
                registrationInfo.classList.add('success');
                let res = JSON.parse(request.response);
                registrationInfo.textContent = Object.values(res);
                registrationModal.classList.remove('show')
                setTimeout(hideInfo, 2000)
            }
        });
        request.send(user);

    })

    function hideInfo() {
        const registrationInfo = document.getElementById('registration-info')
        const classes = ['error', 'success', 'warning'];
        registrationInfo.classList.remove(...classes);
        emailField.value = '';
        passwordField.value = '';

    }
}
document.addEventListener("DOMContentloaded", registrationModalController())