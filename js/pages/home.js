$(document).ready(function() {
    // Scroll to specific section smoothly when clicking on a navbar link {Helper Function}
    function scrollTo(element) {
        window.scroll({
        behavior: 'smooth',
        left: 0,
        top: element.offsetTop
        });
    }

    //When clicking on the discount button
    $("header.header button.discount-btn").on("click", function(e) {
        e.preventDefault();
        scrollTo(document.querySelector("div.discount"));
    });

    //When clicking on the trend button
    $("header.header button.trend-btn").on("click", function(e) {
        e.preventDefault();
        scrollTo(document.querySelector("div.trends"));
    });
});