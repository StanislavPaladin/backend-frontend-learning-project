
function getForm() {
    const formBtn = document.getElementById('form-button')
    console.log(formBtn);

    formBtn.addEventListener('click', function () {
        let formToSend = document.forms["contacts-form"];
        let name = formToSend.elements["name"].value;
        let email = formToSend.elements["email"].value;
        let phone = formToSend.elements["phone"].value;
        let message = formToSend.elements["message"].value;
        // сериализуем данные в json
        let info = JSON.stringify({
            name: name,
            email: email,
            phone: phone,
            message: message
        });
        let request = new XMLHttpRequest();
        request.open("POST", "/sendForm", true);
        request.setRequestHeader("Content-Type", "application/json");
        request.send(info);

        request.addEventListener("load", function () {
            const  info = document.getElementById('login-info')
            // получаем и парсим ответ сервера
            if (request.status == 200) {
                formToSend.elements['name'].value = '';
                formToSend.elements['email'].value = '';
                formToSend.elements['phone'].value = '';
                formToSend.elements['message'].value = '';
                info.classList.add('success');
                info.textContent = Object.values(JSON.parse(request.response));
                setTimeout(hideInfo, 2000)
            } else if (request.status == 400) {
                info.classList.add('error');
                info.textContent = Object.values(JSON.parse(request.response));
                setTimeout(hideInfo, 2000)
            }
        });
        function hideInfo () {
            const  info = document.getElementById('login-info')
            const classes = ['error', 'success', 'warning'];
            info.classList.remove(...classes);
            
        }
    })
}



document.addEventListener('DOMContentLoaded', getForm())