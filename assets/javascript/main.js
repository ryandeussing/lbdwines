'use strict';

(function() {

  prep();

  // this function contains others that need to run on every smoothsState page change
  function prep(){

    //
    // 1 these run at every window width
    //

    // visual grid
    var k = new Kibo();
    k.down(['g'], function() {
      $('body').addClass('grid');
    }).up('g', function() {
      $('body').removeClass('grid');
    });

    // nav menu
    var menuToggle = $(".hamburger").unbind();
    // $("#js-navigation-menu").removeClass("show");

    menuToggle.on("click", function(e) {
      e.preventDefault();
      $(".hamburger--squeeze").toggleClass('is-active');
      $("#js-navigation-menu").slideToggle(function(){
        if($("#js-navigation-menu").is(":hidden")) {
          $("#js-navigation-menu").removeAttr("style");
        }
      });
    });


    // accordion
    $('.accordion').accordion({
      singleOpen: false
    });

    // jqverify

    var agemodal = "#agemodal",
        formsubmit = "#formsubmit",
        modalContent = "main",
        agecookie = 'jqverify';

    // uncomment this line in development:
    // eraseCookie('jqverify');
    // setTimeout(function(){
    //   eraseCookie('jqverify');
    // }, 5000);


    if (!readCookie(agecookie)) {
        jQuery(agemodal).fadeIn();
        // console.log('no cookie');
    } else {
        jQuery(agemodal).hide();
        jQuery(modalContent).fadeIn();
        // console.log('cookie');
    }

    jQuery(formsubmit).on('click', function(event){

      if (event.preventDefault) {
        event.preventDefault();
      } else {
        event.returnValue = false;
      }

      createCookie( agecookie, 1, 1); // expire in 1 hour

      jQuery(agemodal).fadeOut();
      jQuery(modalContent).fadeIn();
      return true;
    });

    function createCookie(name,value,hours) {
      var date = new Date();
      var expires = "";
      if (hours) {
          date.setTime(date.getTime()+(hours*60*60*1000));
          expires = "; expires="+date.toGMTString();
      }
      document.cookie = name+"="+value+expires+"; path=/";

      console.log(name+"="+value+expires+"; path=/");
    }

    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) === 0) {
              return c.substring(nameEQ.length,c.length);
            }
        }
        return null;
    }

    function eraseCookie(cookieName) {
        createCookie(cookieName,"",-1);
    }

    //
    //  2 - these run in an enquire conditional
    //

    // mobile
    enquire.register("screen and (max-width: 768px)", {
        match : function() {

          $(function() {
            // on load
            // console.log('up to 768px wide');

            // on resize
          });
        },
        unmatch : function() {
        }
      })
      // desktop
      .register("screen and (min-width: 769px)", {
        match : function() {
          var windowWidth = $(window).width(); // for resize below
          $(function() {
            // // HOME
            var homeFavorites = $('#home-favorites');
            if (homeFavorites.length > 0)
              homeFavorites.imagesLoaded( function() {
                var favImage = $('#favImage');
                var favImageHeight = favImage.height();
                var favText = $('.favorites .wrapper');
                var makerImage = $('#makerImage');
                var makerImageHeight = makerImage.height();
                var makerText = $('.winemaker .wrapper');
                $(this).addClass('processed');
                favImage.parent().prev().height(favImageHeight);
                makerImage.parent().next().height(makerImageHeight);
                setTimeout(function(){
                  favText.fadeTo(400, 1);
                  makerText.fadeTo(400, 1);
                }, 100);
                window.onresize = debounce(function(){
                  if ($(window).width() != windowWidth) {
                    var favImage = $('#favImage');
                    var favImageHeight = favImage.height();
                    var makerImage = $('#makerImage');
                    var makerImageHeight = makerImage.height();
                    favImage.parent().prev().height(favImageHeight);
                    makerImage.parent().next().height(makerImageHeight);
                  }
                }, 100);
              });

            // // WINES
            var wines = $('#wines');
            if(wines.length > 0)
              wines.imagesLoaded( function() {
                var wines = $('.product');
                wines.fadeTo(400, 1);
                var breakouts = $('.breakout');
                var breakoutHeight = breakouts.eq(0).height();
                var productHeight = $('.product').first().height();
                var pad = (breakoutHeight - productHeight) / 2;
                breakouts.eq(0).prev().css({"margin-bottom": "0px", "padding-top": pad});
                breakouts.eq(1).next().css({"margin-bottom": "0px", "padding-top": pad});
                window.onresize = debounce(function(){
                  if ($(window).width() != windowWidth) {
                    var breakouts = $('.breakout');
                    var breakoutHeight = breakouts.eq(0).height();
                    var productHeight = $('.product').first().height();
                    var pad = (breakoutHeight - productHeight) / 2;
                    breakouts.eq(0).prev().css({"margin-bottom": "0px", "padding-top": pad});
                    breakouts.eq(1).next().css({"margin-bottom": "0px", "padding-top": pad});
                  }
                }, 100);
              });

            // ABOUT
            var about = $('#about');
            if(about.length > 0)
              about.imagesLoaded( function() {
                var makerImageDiv = $('.winemaker .image');
                var makerImageDivHeight = makerImageDiv.height();
                var makerTextDiv = $('.winemaker .text');
                var makerTextDivHeight = $('.winemaker .text').height();
                if (makerTextDivHeight > makerImageDivHeight) {
                  var pad = (makerTextDivHeight - makerImageDivHeight) / 2;
                  makerImageDiv.css("padding-top", pad);
                  setTimeout(function(){
                    makerImageDiv.fadeTo(400, 1);
                    makerTextDiv.fadeTo(400, 1);
                  }, 100);
                } else {
                  var pad = (makerImageDivHeight - makerTextDivHeight) / 2;
                  makerTextDiv.css("padding-top", pad);
                  setTimeout(function(){
                    makerImageDiv.fadeTo(400, 1);
                    makerTextDiv.fadeTo(400, 1);
                  }, 100);
                }
                window.onresize = debounce(function(){
                  if ($(window).width() != windowWidth) {
                    var makerImageDiv = $('.winemaker .image');
                    var makerImageDivHeight = makerImageDiv.height();
                    var makerTextDiv = $('.winemaker .text');
                    var makerTextDivHeight = $('.winemaker .text').height();
                    var pad = 0;
                    if (makerTextDivHeight > makerImageDivHeight) {
                      pad = (makerTextDivHeight - makerImageDivHeight) / 2;
                      makerImageDiv.css("padding-top", pad);
                    } else {
                      pad = (makerImageDivHeight - makerTextDivHeight) / 2;
                      makerTextDiv.css("padding-top", pad);
                    }
                    // console.log('resize about');
                  }
                }, 100);
              });

            // CONTACT
            var contact = $('#contact');
            if(contact.length > 0)
              var winHeight = $(window).height();
              // console.log(winHeight);
              if (winHeight >= 902) {
                setTimeout(function(){
                  $('.footer-wrapper').addClass('fixed');
                }, 500);
              } else {
                $('.footer-wrapper').addClass('static');
              }
              window.onresize = debounce(function(){
                var winHeight = $(window).height();
                if (winHeight >= 902) {
                  $('.footer-wrapper').addClass('fixed');
                } else if (winHeight < 902) {
                  $('.footer-wrapper').removeClass('fixed');
                }
              }, 300);




          });
        },
        unmatch : function() {
        }
      });



  } // end of prep()



  // smoothstate
  var $page = $('#main'),
    options = {
      blacklist: '.no-smoothState',
      debug: true,
      prefetch: true,
      cacheLength: 5,
      onStart: {
        duration: 250, // Duration of our animation
        render: function ($container) {
          // Add your CSS animation reversing class
          $container.addClass('is-exiting');
          // Restart your animation
          smoothState.restartCSSAnimations();
        }
      },
      onReady: {
        duration: 0,
        render: function ($container, $newContent) {
          // Remove your CSS animation reversing class
          $container.removeClass('is-exiting');
          // Inject the new content
          $container.html($newContent);
        }
      },
      onAfter: function() {
        prep();
      }
    },
    smoothState = $page.smoothState(options).data('smoothState');


})();