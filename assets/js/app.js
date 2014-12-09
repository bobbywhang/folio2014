$(function() {
    // "use strict";

    // hamburger nav
    $(".navToggle").click(function() {
        $(this).toggleClass("open");
        $("nav").toggleClass("open");
    });

    /* ---------------------------------------------------------
     *	Nav Scroll
     */

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
        // to view all data
        // console.log(data);

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
     *	Portfolio grid
     */

            $(function() {
                Grid.init();
            });

});
