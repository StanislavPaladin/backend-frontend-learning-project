function createPost() {
    const formBtn = document.getElementById('create-button')
    console.log(formBtn);

    formBtn.addEventListener('click', async function (e) {
        e.preventDefault()

        if (!$) $ = jQuery;
        let picture = document.getElementById('picture');
        let headerImage = document.getElementById('headerImage');

        var formNm = $('#createPost-form')[0];
        let formData = new FormData(formNm);
        formData.append('author', localStorage.getItem('name'));
        formData.append('picture', picture.files[0]);
        formData.append('headerImage', headerImage.files[0]);
        let res = await fetch('/api/posts', {
            method: 'post',
            body: formData
        });
        res = await res.json()
        
        if(res) {
            setTimeout(function(){
                window.location.href = `/news/${res.alias}`;
              }, 100);
        }
       
    })
}



document.addEventListener('DOMContentLoaded', createPost())