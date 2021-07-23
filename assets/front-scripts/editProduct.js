const save = document.querySelector('#save-product');
const content = document.querySelector('#product-content');
const description = document.querySelector('#product-description');
const title = document.querySelector('#product-title');
const icon = document.querySelector('#product-icon');
const test = document.querySelector('#product-href');
const alias = test.getAttribute('href');
const id = document.getElementById("product-id");
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
    formData.append('icon', icon.value);
    formData.append('alias', alias);
    formData.append('picture', picture.files[0]);
    formData.append('headerImage', headerImage.files[0]);
    formData.append('_id', id.textContent)
    if (icon.value=='') {
        formData.delete('icon')
    }
    console.log(...formData);
    let res = await fetch('/api/products', {
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
        window.location.href = `/products/${alias}`;
    }, 100);
    return

})