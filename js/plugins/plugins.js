$(function() {
    //Trigger Nice Scroll
    $('body').niceScroll({
        cursorcolor: "#e63946", //default theme color
        cursorwidth: '14px',        
        zindex: 999,
        horizrailenabled:false
    });

    //Trigger Bx Slider
    $(".bxslider").bxSlider({
        pager: false, // remove the bullets at the bottom of the bxslider, you can show it as you want by set true instead of false
        auto:  true  //allow to start the silder automatically
    });

    //Trigger Slick Slider
    $(".news-carousel.slider").slick({
        cssEase: 'linear',
        slidesToShow: 4,
        slidesToScroll: 1,
        speed: 8000,
        autoplay: true,
        arrows: false,
        autoplaySpeed: 0,
        infinite: true,
        swipeToSlide: false,
        dots: false,
        pauseOnHover: false,
        centerMode: false,
        focusOnSelect: true,
        responsive: [{
            breakpoint: 1199,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        }, {
        breakpoint: 768,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    });
});