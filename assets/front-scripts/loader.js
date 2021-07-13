const loader = document.querySelector('.loader')
console.log(loader);

let opacity = 1;

function loaderController() {
    let timer = setInterval(function () {
        if (opacity <= 0){
            loader.style.display = "none";
            clearInterval(timer);
        } 
        else {
            opacity = opacity - 0.035;
            loader.style.opacity = opacity;
        }
    }, 20); 
}
document.addEventListener('DOMContentLoaded', loaderController())