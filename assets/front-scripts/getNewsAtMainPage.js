let mainNews = document.querySelector('#news-main');

function getNews() {
    fetch('/api/news').then(function (response) {
        if (response.ok) {
            response.text().then(function (res) {
                let posts = JSON.parse(res);
                posts.forEach(post => {
                    let item = document.createElement('div');
                    item.classList.add('item');
                    item.innerHTML = `
                    <div class="image">
                    <a href="/posts/${post._id}">
                    <img src="${post.picture}" alt="image"></div>
                        <span class="title">${post.title}</span>
                        <span class="date">${post.date.split('T')[0]}</span>
                    </a>
                `
                    mainNews.append(item)
                })
            })
        }
    })
}

document.addEventListener('DOMContentLoaded', getNews);