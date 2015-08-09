var $ = window.jQuery = require('jquery');
var cookies = require('js-cookie');
require('jquery.scrolling/jquery.scrolling');
require('slick-carousel');

if (cookies.get('loggedin')) {
    window.location = '/app';
}

$(function() {
    $('.gotrl-top').css({
        backgroundImage: 'url(/landing-background.jpg)'
    });

    if ($(window).width() > 800) {
        var video = $('.gotrl-panel-three-right video').scrolling({
            offsetLeft: 700,
            offsetTop: -100
        });

        var anltcs = $('.gotrl-panel-four-left img').scrolling({
            offsetLeft: -700,
            offsetTop: -30
        });

        var social = $('.gotrl-panel-social-right img').scrolling({
            offsetLeft: 700,
            offsetTop: -100
        });


        if (video.is(':scrollin')) {
            slideInFromRight.call(video);
        } else {
            video.one('scrollin', slideInFromRight);
        }

        if (anltcs.is(':scrollin')) {
            slideInFromLeft.call(anltcs);
        } else {
            anltcs.one('scrollin', slideInFromLeft);
        }

        if (social.is(':scrollin')) {
            slideInFromRight.call(social);
        } else {
            social.one('scrollin', slideInFromRight);
        }
    }

    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');

            if (target.length) {
                $('html,body').animate({scrollTop: target.offset().top}, 1000);
                return false;
            }
        }
    });

    $('#gotrl-panel-five-carousel').slick({
        infinite: true,
        dots: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: false
    });
});

function slideInFromRight() {
    $(this).animate({
        opacity: 1,
        marginLeft: 0
    }, 500);
}

function slideInFromLeft() {
    $(this).animate({
        opacity: 1,
        marginLeft: -40
    }, 500);
}
