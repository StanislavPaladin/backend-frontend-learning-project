
let items = document.querySelector('.items');
let mainSection = document.querySelector('.news-big')
let getOne = (id) => {
    fetch(`/api/posts/${id}`).then(function (response) {
        if (response.ok) {
            response.text().then(function (res) {
                let post = JSON.parse(res);
            })
        }
}
    )}

function getPostsList() {
    fetch('/api/news').then(function (response) {
        if (response.ok) {
            response.text().then(function (res) {
                let posts = JSON.parse(res);
                posts.forEach(post => {
                    let item = document.createElement('li');
                    item.classList.add('item');
                    item.innerHTML = `
                    <img class="image" src="${post.picture}" alt="image">
                    <div class="text">
                    <a class="link-news" href="/posts/${post._id}"onClick="getOne(${post._id})">
                        <p class="title">${post.title}</p>
                        <div class="date">
                            <img src="/assets/fonts/unicons/clock.svg" alt="image">
                            ${post.date.split('T')[0]}</div>
                            </a>
                    </div>
                `
                items.append(item)
            })
        })
    }
    })

    fetch('/api/getLast').then(function(response) {
        if(response.ok) {
            response.text().then(function(res){
                let post = JSON.parse(res);
                let onePost = post[0]; /* здесь получается массив из постов, а т.к. нужен только один - обращаемся к нему по индексу 0*/
                let newsOne = document.createElement('div')
                newsOne.innerHTML = `
                <div class="date">${onePost.date.split('T')[0]}</div>
                <div class="title">${onePost.title}</div>
                <div class="user">${onePost.author}</div>
                <img class="image" src="${onePost.picture}"alt="image">
                <div class="text">${onePost.content}</div>
                `
                mainSection.append(newsOne)
            })
        }
    })
}

document.addEventListener('DOMContentLoaded', getPostsList);