/* прилипающее меню */
window.onscroll = function () {
    stick()
};

function stick() {
    if (document.documentElement.scrollTop > 50) {
        document.querySelector("#menu").classList.add('scrolling')
    } else {
        document.querySelector("#menu").classList.remove('scrolling')
        
    }
}




