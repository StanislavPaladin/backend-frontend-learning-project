
// let test = document.getElementById('test')
// let formBtn = document.getElementById('form_btn');
// let getUsers = document.getElementById('get-users');
// let deleteUser = document.getElementById('delete-user')
// let requestForDelete = document.getElementById('requestForDelete');
// let display = document.querySelector('.asd');
// let postPost = document.getElementById('post_post');
// deleteUser.addEventListener('click', async function () {
//     let userName = requestForDelete.value;
//     // сериализуем данные в json
//     let user = JSON.stringify({
//         username: userName,
//     });
//     let request = new XMLHttpRequest();
//     request.open("POST", "/auth/delete", true);
//     request.setRequestHeader("Content-Type", "application/json");
//     request.onreadystatechange = function () {
//         // получаем и парсим ответ сервера
//         let receivedUser = JSON.parse(user);
//         console.log('user', receivedUser);
//     };
//     request.send(user);
//     setTimeout(getUsersList, 100)
// })

// function getUsersList() {
//     getUsers.innerHTML = "ПОЛУЧИТЬ СПИСОК ПОЛЬЗОВАТЕЛЕЙ"
//     requestForDelete.value = ''
//     fetch("/auth/users").then(function (response) {
//         if (response.ok) {
//             response.text().then(function (res) {
//                 let users = JSON.parse(res);
//                 users.forEach(item => {
//                     console.log(item.username);
//                     let x = document.createElement('div');
//                     getUsers.append(x);
//                     x.textContent = item.username
//                 });
//             });
//         } else {
//             console.log('error');
//         }
//     });
// }
// getUsers.addEventListener('click', getUsersList)
// formBtn.addEventListener('click', function () {
//     let registerForm = document.forms["test"];
//     let userName = registerForm.elements["username"].value;
//     let email = registerForm.elements["email"].value;
//     let password = registerForm.elements["password"].value
//     // сериализуем данные в json
//     let user = JSON.stringify({
//         username: userName,
//         password: password,
//         email: email
//     });
//     let request = new XMLHttpRequest();
//     request.open("POST", "/auth/registration", true);
//     request.setRequestHeader("Content-Type", "application/json");
//     request.addEventListener("load", function () {
//         // получаем и парсим ответ сервера
//         let receivedUser = JSON.parse(user);
//         console.log(receivedUser);
//     });
//     request.send(user);
// })
