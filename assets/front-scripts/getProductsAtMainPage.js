let main = document.querySelector('#products-main');

function getProducts() {
    console.log(main);
    fetch('/api/products').then(function (response) {
        if (response.ok) {
            response.text().then(function (res) {
                let products = JSON.parse(res);
                products.forEach(product => {
                    let item = document.createElement('div');
                    item.classList.add('product');
                    item.innerHTML = `
                    
                    <div class="icon">
                    <i class="${product.icon}"></i>
                </div>
                <div class="text-wrapper">
                <a href="/products/${product._id}">
                    <div class="title">${product.title}</div>
                    <div class="text">${product.subtitle}</div>
                    </a>
                </div>
                
                `
                    main.append(item)
                })
            })
        }
    })
}

document.addEventListener('DOMContentLoaded', getProducts);