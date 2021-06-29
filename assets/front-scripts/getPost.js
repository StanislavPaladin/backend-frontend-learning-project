const getPost = () => {
    const post = document.getElementById('postId')
    const main = document.getElementsByClassName('main')
    let postId = post.name;

function getBreadcrumbs () {  //Т.к. для страниц постов/продуктов должны быть отдельные breadcrumbs - делаю скрипт, для управления ими
    let title = document.getElementById('big-news-title');
    let breadcrumbs = document.querySelector('.breadcrumbs');

    
    breadcrumbs.innerHTML = ` <a href="/">Главная</a> / <a href="/news"> Новости </a> / <a class="active" href="#"> ${title.textContent} </a>`;
}

    fetch(`/api/posts/${postId}`).then(function (response) {
        if (response.ok) {
            response.text().then(function (res) {
                let result = JSON.parse(res)
                let post = document.createElement('div')
                post.innerHTML = `<div class="post-wrapper">
                <img class="image" src="../${result.picture}" alt="image">
                <div class="date">${result.date.split('T')[0]}</div>
                <div class="title" id='big-news-title'>${result.title}</div>
                <div class="text">${result.content}</div>
                </div>`;
                main[0].append(post)
                getBreadcrumbs()
            })
        }
    })
}

document.addEventListener('DOMContentloaded', getPost())