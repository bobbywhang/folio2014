$(function() {
    // "use strict";


    $(".navToggle").click(function() {
        $(this).toggleClass("open");
        $("nav").toggleClass("open");
    });

    function getGridSize() {
        return (Modernizr.mq('(max-width:490px)')) ? 1 :
            (Modernizr.mq('(max-width:705px)')) ? 2 :
            (Modernizr.mq('(max-width:768px)')) ? 3 : 4;
    }

    /* ---------------------------------------------------------
     *	Background
     */

    // $.backstretch([
    // 	"assets/img/background/1.jpg"
    // ], {duration: 3800, fade: 1500});
    //jQuery to collapse the navbar on scroll
    $(window).scroll(function() {
        if ($(".navToggle").offset().top > 50) {
            $(".navbar-fixed-top").addClass("top-nav-collapse");
        } else {
            $(".navbar-fixed-top").removeClass("top-nav-collapse");
        }
    });

    //jQuery for page scrolling feature - requires jQuery Easing plugin
    $(function() {
        $('a.page-scroll').bind('click', function(event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top
            }, 1500, 'easeInOutExpo');
            event.preventDefault();
        });
    });


    /* ---------------------------------------------------------
     *	WOW
     */

    new WOW({
        mobile: false
    }).init();

    /* ---------------------------------------------------------
     *	Github Widget
     */

    $(function() {
        $('.github-info').githubInfo();
    });


    /* ---------------------------------------------------------
     *	TextRotator
     */

    $(".rotate").textrotator({
        animation: "dissolve", // You can pick the way it animates when rotating through words. Options are dissolve (default), fade, flip, flipUp, flipCube, flipCubeUp and spin.
        separator: ",", // If you don't want commas to be the separator, you can define a new separator (|, &, * etc.) by yourself using this field.
        speed: 2500 // How many milliseconds until the next word show.
    });

    /* ---------------------------------------------------------
     *	Twitter
     */


    var config1 = {
        "id": '539847403545706496',
        "domId": 'example1',
        "maxTweets": 1,
        "enableLinks": true
    };
    twitterFetcher.fetch(config1);

     /* ---------------------------------------------------------
     *	Last FM
     */   


    $.getJSON('http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=thewhangsta&api_key=1a8e56323649278c20e3e192f8edca5b&limit=1&format=json&callback=?', function(data) {

        var track = data.recenttracks.track[0];
        console.log(data);

        if (!data.recenttracks.track[0]) {
            track = data.recenttracks.track;
        }

        var artist = track.artist['#text'],
            album = track.album['#text'],
            song = track.name,
            url = track.url,
            src = track.image[3]['#text'];

        if (src == '' || src == null || src == 'undefined') {
            src = '';
        }

        $('li.lastfm').find('.preview')
            .css('background-image', 'url(' + src + ')')
            .attr({
                'href': url,
                'title': artist + ' on Last.fm'
            })
            .siblings('p').find('a').html(song)
            .attr({
                'href': url,
                'title': artist
            })
            .siblings('em').html(artist)
            .attr({
                // 'href': 	url,
                // 'title': 	artist,
                'album': album
            })
            .siblings('i').html(album);


    });


    /* ---------------------------------------------------------
     *	Portfolio
     */

    var $grid = $('#portfolio-container');

    $grid.imagesLoaded(function() {
        $grid.shuffle({
            itemSelector: '.portfolio-item',
            speed: 450
        });

        $('#filter a').click(function(e) {
            e.preventDefault();

            // set active class
            $('#filter a').removeClass('active');
            $(this).addClass('active');

            // get group name from clicked item
            var groupName = $(this).attr('data-group');

            // reshuffle grid
            $grid.shuffle('shuffle', groupName);
        });
    });

    /* ---------------------------------------------------------
     *	GITheWall
     */

    $('.GITheWall').GITheWall({
        nextButtonClass: 'fa fa-chevron-right',
        prevButtonClass: 'fa fa-chevron-left',
        closeButtonClass: 'fa fa-times',
        dynamicHeight: false,
        onShow: function() {
            $("#portfolio-container").slideDown(300).fadeOut(300);
            $(".filter-tags").slideDown(300).fadeOut(300);
            $("#portfolio-more").slideDown(300).fadeOut(300);
        },
        onHide: function() {
            $("#portfolio-container").slideUp(300).fadeIn(300);
            $(".filter-tags").slideUp(300).fadeIn(300);
            $("#portfolio-more").slideUp(300).fadeIn(300);
        }
    });


});
