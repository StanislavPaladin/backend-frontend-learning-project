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
        formToSend.elements['name'].value = '';
        formToSend.elements['email'].value = '';
        formToSend.elements['phone'].value = '';
        formToSend.elements['message'].value = '';
        request.addEventListener("load", function () {
            // получаем и парсим ответ сервера
            let recievedInfo = JSON.parse(info);
            console.log(recievedInfo);
            console.log(123);
        });

    })
}



document.addEventListener('DOMContentLoaded', getForm())