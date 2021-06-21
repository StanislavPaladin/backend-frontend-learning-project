/* прилипающее меню */
window.onscroll = function () {
    stick()
};

function stick() {
    if (document.documentElement.scrollTop > 50) {
        console.log(1);
        document.querySelector("#menu").style.top = '0px'
    } else {
        document.querySelector("#menu").style.top = '50px'
    }
}


