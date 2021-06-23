const swiper = new Swiper('.swiper-container', {
    direction: 'horizontal',
    loop: true,
    effect: 'cube',
    slideActiveClass: 'swiper-slide-active',
    resizeObserver: true,
    parallax: true,
    scrollbar: {
        hide: true,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    
});