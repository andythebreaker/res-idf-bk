var swipeadd = function () {
    var defaults = {
        pagination: '.swiper-pagination',
        slidesPerView: 3, freeMode: true,
        freeModeSticky: true,
        freeModeMomentumRatio: 0.25,
        freeModeVelocityRatio: 0.25,
        freeModeMinimumVelocity: 0.1,
        mousewheelControl: true,
        mousewheelSensitivity: 0.5,
        loop: true,
        loopAdditionalSlides: 0,
        direction: 'vertical',
        slideToClickedSlide: true,
        centeredSlides: true,
        on: {
            slideChange: function (thisSW) {
                /*var datah6 = document.getElementsByClassName("TimepickerusingSwiperjs")[0];
                var objdh6 = JSON.stringify(datah6);
                if (thisSW.el.classList.contains("hours")) {
                    objdh6.L1 = thisSW.realIndex;
                }
                else if (thisSW.el.classList.contains("minutes")) {
                    objdh6.L2 = thisSW.realIndex;
                }
                else if (thisSW.el.classList.contains("minutes")) {
                    objdh6.L3 = thisSW.realIndex;
                }
                else if (thisSW.el.classList.contains("tolerance")) {
                    objdh6.L4 = thisSW.realIndex;
                }
                else { console.log("[ERROR] swipeadd.js"); }*/
                //TODO
            },
        },
    };
    var swiper1 = new Swiper('.swiper-container.hours', Object.assign({}, defaults, { initialSlide: 4 }));
    var swiper2 = new Swiper('.swiper-container.minutes', Object.assign({}, defaults, { initialSlide: 8 }));
    var swiper3 = new Swiper('.swiper-container.seconds', Object.assign({}, defaults, { initialSlide: 7 }));
    var swiper4 = new Swiper('.swiper-container.tolerance', Object.assign({}, defaults, { initialSlide: 10 }));
    console.log('into swipe');
}