
let news = document.getElementById('news');
console.log(news);
let asd = document.querySelector('.items');
console.log(asd);


function getPostsList() {
    fetch('/api/news').then(function (response) {
        if (response.ok) {
            response.text().then(function (res) {
                let posts = JSON.parse(res);
                posts.forEach(post => {
                    let item = document.createElement('li');
                    item.innerHTML = `<li class="item">
                    <img class="image" src="${post.picture}" alt="image">
                    <div class="text">
                    <a href="/api/posts/${post._id}">
                        <p class="title">${post.title}</p>
                        <div class="date">
                            <img src="/assets/fonts/unicons/clock.svg" alt="image">
                            ${post.date.split('T')[0]}</div>
                            </a>
                    </div>
                </li>`
                asd.append(item)
                })
            })
        }
    })
}


document.addEventListener('DOMContentLoaded', getPostsList);