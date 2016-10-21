/*
    Template: Hallooou HTML5 Responsive template
    Author: Mauritius D'Silva <hello@mauritiusdsilva.com>
    Theme URI: http://www.mauritiusdsilva.com/themes/hallooou
    Version: 1.0
*/



// WOW.js initialise
// WOW.js uses animate.css to animate/reveal elements.
// Browse the list of animation effects available here-> https://daneden.github.io/animate.css/
$(function() {
    return;
    let wow = new WOW({
        boxClass: 'wow', // default
        animateClass: 'animated', // default
        offset: 0, // default
        mobile: true, // default
        live: true // default
    })
    wow.init();
});


// // jQuery Parallax. More info here-> https://github.com/IanLunn/jQuery-Parallax
// $(function() {
//     // apply parallax effect only when body has the ".parallax-page" class
//     if ($('body').hasClass('parallax-page')) {
//         //.parallax(xPosition, speedFactor, outerHeight) options:
//         //xPosition - Horizontal position of the element
//         //inertia - speed to move relative to vertical scroll. Example: 0.1 is one tenth the speed of scrolling, 2 is twice the speed of scrolling
//         //outerHeight (true/false) - Whether or not jQuery should use it's outerHeight option to determine when a section is in the viewport

//         $('#parallax-slide').parallax("50%", 0.1);
//         $('#products').parallax("50%", 0.1);
//         $('#portfolio').parallax("50%", 0.1);
//         $('#page-aboutus').parallax("50%", 0.1);
//     }
// });



// HTML5 Player
$(function() {

    var vid = $("#html5-video").get(0);

    $('#html5-video-play').click(function(event) {
        event.preventDefault();
        if (vid.paused) {
            vid.play();
        } else {
            vid.pause();
        }
        $(this).toggleClass('fa-play fa-pause');
        return false;
    });

    $('#html5-video-volume').click(function(event) {
        event.preventDefault();
        if (vid.muted) {
            vid.muted = false;
        } else {
            vid.muted = true;
        }
        $(this).toggleClass('fa-volume-off fa-volume-up');
        return false;
    });
});


// Lightbox
$(function() {
    return;
    $('.popup-gallery').magnificPopup({
        delegate: '.full-project a',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
            titleSrc: function(item) {
                return item.el.attr('title') + '<small>by Hallooou</small>';
            }
        }
    });

});

