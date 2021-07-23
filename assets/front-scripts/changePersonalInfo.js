function createPost() {
    const changePersonalInfo = document.getElementById('change-personal-info')
    console.log(changePersonalInfo);

    changePersonalInfo.addEventListener('click', async function (e) {
        e.preventDefault()

        if (!$) $ = jQuery;
        let userId = document.getElementById('user-id').textContent;
        console.log(userId);
        var formNm = $('#personal-info')[0];
        let formData = new FormData(formNm);
        let picture = document.getElementById('new-avatar');
        let newUsername = document.getElementById('new-username');
        let newUserPassword = document.getElementById('new-password');
        let oldUserPassword = document.getElementById('old-password');
        console.log(newUserPassword.value);
        let newPicture = document.getElementById('new-avatar');
        if (newUsername.value == '') {
            formData.delete('name')
        }
        if (oldUserPassword.value == '') {
            formData.delete('password');
            formData.delete('oldPassword');
        }
        if (newPicture.files.length < 1) {
            formData.append('picture', picture.files[0]);
        }
        formData.append('_id', userId);

        console.log(...formData);
        let res = await fetch('/auth/users', {
            method: 'put',
            body: formData
        });
        res = await res.json()
        if (res.message == 'Успешно изменено') {
            const loginInfo = document.getElementById('login-info');
            loginInfo.classList.remove('error');
            loginInfo.classList.add('success');
            loginInfo.textContent = res.message;
            setTimeout(function () {
                document.location.href = `/account/${localStorage.getItem('name')}`;
            }, 100);
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
    })
}



document.addEventListener('DOMContentLoaded', createPost())