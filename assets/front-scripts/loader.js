const loader = document.querySelector('.loader')
console.log(loader);


let counter = 0;
let opacity = 1;

function loaderController() {
    let timer = setInterval(function () {
        if (opacity <= 0){
            loader.style.display = "none";
            clearInterval(timer);
        } 
        else {
            counter += counter;
            opacity = opacity - 0.02;
            loader.style.opacity = opacity;
        }
    }, 20); 
}
document.addEventListener('DOMContentLoaded', loaderController())