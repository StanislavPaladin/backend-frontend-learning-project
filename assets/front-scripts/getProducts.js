let items = document.querySelector('.items');

function getProducts() {
    fetch('/api/products').then(function (response) {
        if (response.ok) {
            response.text().then(function (res) {
                let products = JSON.parse(res);
                products.forEach(product => {
                    let item = document.createElement('li');
                    item.classList.add('item');
                    item.innerHTML = `
                    <a href="/products/${product._id}"><img src="${product.picture1}" alt=""></a>
            <a href="/products/${product._id}" class="title">${product.title}</a>
            <div class="line"></div>
            <span class="text">${product.subtitle}</span>
                `
                    items.append(item)
                })
            })
        }
    })
}

document.addEventListener('DOMContentLoaded', getProducts);