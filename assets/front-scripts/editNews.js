const save = document.querySelector('#save-post');
const content = document.querySelector('#post-content');
const description = document.querySelector('#post-description');
const title = document.querySelector('#post-title');
const test = document.querySelector('#post-href');
const alias = test.getAttribute('href');
const id = document.getElementById("post-id");
let picture = document.getElementById('picture');
let headerImage = document.getElementById('headerImage');

save.addEventListener('click', async function (e) {
    e.preventDefault();
    console.log();
    // сериализуем данные в json
    if (!$) $ = jQuery;
    var formNm = $('#change-puctures')[0];
    console.log(formNm);
    let formData = new FormData(formNm);
    formData.append('title', title.textContent);
    formData.append('content', content.textContent);
    formData.append('description', description.textContent);
    formData.append('alias', alias);
    formData.append('picture', picture.files[0]);
    formData.append('headerImage', headerImage.files[0]);
    formData.append('_id', id.textContent);  
    console.log(...formData);
    let res = await fetch('/api/posts', {
        method: 'put',
        body: formData
    });
    res = await res.json()
    if (res.message == 'Успешно изменено') {
        const loginInfo = document.getElementById('login-info');
        loginInfo.classList.remove('error');
        loginInfo.classList.add('success');
        loginInfo.textContent = res.message;
    } else {
        const loginInfo = document.getElementById('login-info');
        loginInfo.classList.remove('success');
        loginInfo.classList.add('error');
        loginInfo.textContent = res.message;
        setTimeout(hideInfo, 2000)
    }
    function hideInfo() {
        const loginInfo = document.getElementById('login-info')
        const classes = ['error', 'success', 'warning'];
        loginInfo.classList.remove(...classes);

    }
    setTimeout(function () {
        window.location.href = `/news/${alias}`;
    }, 100);
    return

})