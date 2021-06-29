const getPost = () => {
    const post = document.getElementById('postId')
    const main = document.getElementsByClassName('main')
    let postId = post.name;

    fetch(`/api/posts/${postId}`).then(function (response) {
        if (response.ok) {
            response.text().then(function (res) {
                let result = JSON.parse(res)
                let post = document.createElement('div')
                post.innerHTML = `<div class="post-wrapper">
                <img class="image" src="../${result.picture}" alt="image">
                <div class="date">${result.date.split('T')[0]}</div>
                <div class="text">${result.content}</div>
                </div>`;
                main[0].append(post)
            })
        }
    })
}

document.addEventListener('DOMContentloaded', getPost())