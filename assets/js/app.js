(function () {
    "use strict";


    $(function () {
        initDeviceCheck();
        initBussinesSwiper();
        initYT();
        initOffCanvas();
        // initOrcParticles();
        // initPaladinParticles();
        initAccodron();
        initRangeSlider()
        initTextSlider();
        initSticky();
        initSmoothScroll();
        if (f.detect.isDesktop()) {
            initMainCoverParallax();
            initPaladinParallax();
        }
        initSubscribe();
        initMedium();


        // var config = {
        //     apiKey: "AIzaSyDw889I-qyGHUvHlBTk7Yx4rAnM2nhA5x0",
        //     authDomain: "not-for-p.firebaseapp.com",
        //     databaseURL: "https://not-for-p.firebaseio.com",
        //     projectId: "not-for-p",
        //     storageBucket: "not-for-p.appspot.com",
        //     messagingSenderId: "638049154524"
        // };
        // firebase.initializeApp(config);
        //
        // firebase.database().ref('/subscribers').once('value').then(function (snapshot) {
        //     var $subscribers = $('.js-subscribers');
        //     if ($subscribers.length > 0) {
        //         subscribersCountUp = new CountUp($subscribers[0], snapshot.val(), snapshot.val(), 0, 0.001);
        //         subscribersCountUp.start();
        //     }
        //
        // });

        if ($('#embedded-typeform').length > 0) {
            window.typeformEmbed.makeWidget($('#embedded-typeform')[0], "https://justasbrazauskas.typeform.com/to/s9SKnK", {
                hideFooter: true,
                hideHeaders: true,
                opacity: 0
            });
        }

    });

    function closeOffCanvas(canvas) {
        var $body = $("body");
        var $canvas;
        if (canvas) {
            if (typeof canvas === 'object') {
                $canvas = canvas;
            } else {
                $canvas = $(canvas);
            }
        }


        $body.attr('class', function (i, c) {
            return c.replace(/(^|\s)off-canvas\S+/g, '');
        });
        $body.removeClass("has-scrollbar");
        if ($canvas) {
            $canvas.removeClass("is-visible");
        } else {
            $(".off-canvas").removeClass("is-visible");
        }
        $(".hamburger").removeClass('is-active');

    }

    function initSubscribe() {
        if ($('.js-subscribers').length > 0) {
            $.ajax({
                type: "GET",
                url: "https://www.mergethegame.com/.netlify/functions/subscriberscount",
                dataType: "JSON",
                data: {},
                success: function (resp) {
                    $('.js-subscribers').text(resp);
                },
                error: function (response) {
                },

            });
        }
        $('.subscribe button').on('click', function (e) {
            e.preventDefault();

            var input = $(this).closest('.subscribe').find('input')[0];
            var $subscribe = $(this).closest('.subscribe');
            var email = $(this).closest('.subscribe').find('input').val();

            $subscribe.find('.subscribe__message').remove();

            if (input.checkValidity()) {
                $.ajax({
                    type: "POST",
                    url: "https://api.convertkit.com/v3/forms/386451/subscribe",
                    data: {
                        api_key: "wR0SLE-B7kMUrW-WqVVKyg",
                        email: email
                    },
                    success: function () {
                        dataLayer.push({'event': 'formSubmitted'});
                        localStorage.setItem('email', email);

                        $.ajax({
                            type: "POST",
                            url: "https://www.notforp.com/.netlify/functions/subscriberscount",
                            dataType: "JSON",
                            data: {},
                            success: function (resp) {
                                $('.js-subscribers').text(resp);
                                window.location.href = "https://www.notforp.com/thank-you.html";
                            },
                            error: function (response) {
                            },

                        });

                    },
                    error: function (response) {
                        showErr(response.responseJSON.message);
                    },
                    dataType: "JSON"
                });
            } else {
                showErr('Incorrect email address.')
            }

            function showSuccess() {
                $subscribe.append('<div class="subscribe__message">Please check you email.</div>')
            }

            function showErr(err) {
                $subscribe.append('<div class="subscribe__message -err">' + err + '</div>')
            }


        });
    }


    function initSmoothScroll(offset) {
        $('a[href*="#"]:not([href="#"])').click(function () {
            if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
                var target = $(this.hash);
                var hash = this.hash;
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (!offset) {
                    offset = 0;
                }
                if (target.length) {
                    closeOffCanvas('.off-canvas-side-menu');
                    $('html,body').animate({
                        scrollTop: target.offset().top + offset
                    }, 500, 'easeOutCubic', function () {
                        if (window.location && window.location.hash) {
                            window.location.hash = hash;
                        }
                    });
                    return false;
                }
            }
        });
    }


    function initMedium() {
        if ($('#blog-section').length === 0) return;

        var mediumRSSFeed = 'https://medium.com/feed/not-for-p';
        var mediumJSON = 'https://api.rss2json.com/v1/api.json?rss_url=' + mediumRSSFeed;
        var blogFirstPosthtml = '';
        var blogPostshtml = '';

        $.get(mediumJSON, {}, function (response) {
            console.log(response);

            for (var i = 0; i < response.items.length; i++) {
                var item = response.items[i];
                var date = moment(item.pubDate).format('MMMM D, YYYY');
                item.content = item.content.replace(/img/g, 'img000');
                console.log('item', item.content);
                var content = $('<span></span>').html(item.content).find('p:first').text();
                console.log(content)

                if (i == 0) {
                    blogFirstPosthtml = '<div class=" col-lg-8  order-lg-2">\n\
                        <a class="blog__main-img lazyload" href="' + f.escape(item.link) + '" target="_blank" data-bg="' + f.escape(item.thumbnail) + '"></a>\n\
                        </div>\n\
                        <div class="col-lg-4 order-lg-1">\n\
                        <a class="blog__card" href="' + f.escape(item.link) + '"  target="_blank">\n\
                        <div class="blog__text">\n\
                        <h3>' + f.escape(item.title) + '</h3>\n\
                    <p class="par">' + f.escape(content) + '</p>\n\
                    <p class="par blog__date">' + date + '</p>\n\
                    </div>\n\
                    </a>\n\
                    </div>';
                } else {
                    blogPostshtml += '<div class="col-lg-4">\n\
                        <a class="blog__card" href="' + f.escape(item.link) + '"  target="_blank">\n\
                        <div class="blog__img lazyload" data-bg="' + f.escape(item.thumbnail) + '"></div>\n\
                        <div class="blog__text">\n\
                        <h3>' + f.escape(item.title) + '</h3>\n\
                    <p class="par">' + f.escape(content) + '</p>\n\
                    <p class="par blog__date">' + date + '</p>\n\
                    </div>\n\
                    </a>\n\
                    </div>'
                }
            }

            $('#blog-first-post').html(blogFirstPosthtml)
            $('#blog-posts').html(blogPostshtml);

        });

    }

    function initPaladinParallax() {
        if (!document.getElementById('paladinSkirma')) return;

        var controller = new ScrollMagic.Controller();
        var duration = parseInt($('.section-3').outerHeight()) / 2;

        var paladinSmokeScene = new ScrollMagic.Scene({triggerElement: ".section-3", duration: duration * 1.2})
            .setTween("#paladinSmoke", 1, {y: 0})
            .addTo(controller);

        var paladinSkirmaScene = new ScrollMagic.Scene({triggerElement: ".section-3", duration: duration})
            .setTween("#paladinSkirma", 1, {y: 0})
            .addTo(controller);

        // .setTween(new TweenLite.to('#paladinSkirma', 1, {css: {y: 0}}))
        // setTween(new TweenLite.to('#paladinSkirma', 700, {css: {transform: 'translate3d(0, 0, 0)'}}))
        // .setTween("#animate2", {borderTop: "30px solid white", backgroundColor: "blue", scale: 0.7})
        // .addIndicators({name: "2 (duration: 300)"}) // add indicators (requires plugin)

    }

    function initMainCoverParallax() {
        var orcParallax = document.getElementById('orcParallax');
        var $section1 = $('.section-1');
        if (!orcParallax) return;

        var $body = $("body");
        var $sectionBg = $('.section-1 .section__bg');

        var parallaxInstance = new Parallax(orcParallax, {
            relativeInput: false,
            hoverOnly: false,
            calibrateX: true,
            invertX: false,
            invertY: false,
            frictionX: 0.07,
            frictionY: 0.07
        });


        TweenLite.set($sectionBg, {transformStyle: 'preserve-3d'});

        $body.mousemove(function (e) {
            var pageX = e.pageX;
            var pageY = e.pageY;
            var heightY = $section1.outerHeight()
            if (pageY > heightY + 300) {
                pageY = heightY + 300
            }

            var sxPos = pageX / $body.width() * 100 - 50;
            var syPos = pageY / $body.height() * 100 - 50;
            // console.log("x:" + sxPos + ", y:" + syPos, e.pageY);
            TweenLite.to($sectionBg, 0.55, {rotationY: 0.05 * sxPos, rotationX: 0.02 * syPos, rotationZ: '-0.1', transformPerspective: 650, transformOrigin: 'center center'});

        });


    }

    function initSticky() {
        var $menu = $('.menu');

        detect();
        $(document).scroll(function () {
            detect();
        });

        function detect() {
            if ($(document).scrollTop() > 100) {
                $('.menu').addClass('is-sticky');
            } else {
                $('.menu').removeClass('is-sticky');
            }
        }
    }

    function initTextSlider() {
        var swiper = new Swiper('.text-slider .swiper-container', {
            // Optional parameters
            loop: true,

            // If we need pagination
            pagination: {
                el: '.text-slider .swiper-pagination',
                type: 'bullets',
                clickable: true

            },
            autoplay: {
                delay: 5000
            },
        });
    }

    function initRangeSlider() {
        if ($('.calc').length === 0) return;
        var $transactionCut = $('.calc .transaction-cut');
        var $cosmetics = $('.calc .cosmetics');
        var $ladderEntrance = $('.calc .ladder-entrance');
        var $ransom = $('.calc .ransom');
        var $horizontView = $('.js-horizont-view');


        var vals = {
            2019: {
                'transactionCut': 360000,
                'cosmetics': 150000,
                'ladderEntrance': 60000,
                'ransom': 30000
            },
            2020: {
                'transactionCut': 918000,
                'cosmetics': 382500,
                'ladderEntrance': 153000,
                'ransom': 76500
            },
            2021: {
                'transactionCut': 1764900,
                'cosmetics': 735375,
                'ladderEntrance': 294150,
                'ransom': 147075
            },
            2022: {
                'transactionCut': 2770695,
                'cosmetics': 1154456,
                'ladderEntrance': 461782,
                'ransom': 230891
            },
            2023: {
                'transactionCut': 3683882,
                'cosmetics': 1534950,
                'ladderEntrance': 613980,
                'ransom': 306990
            }
        }
        var transactionCutCountUp = new CountUp($transactionCut[0], 0, 0, 0, 0.1);
        var cosmeticsCutCountUp = new CountUp($cosmetics[0], 0, 0, 0, 0.1);
        var ladderEntranceCutCountUp = new CountUp($ladderEntrance[0], 0, 0, 0, 0.1);
        var ransomCutCountUp = new CountUp($ransom[0], 0, 0, 0, 0.1);


        changeProjection(Object.keys(vals)[0]);

        var slider = $('.calc input[type="range"]').rangeslider({
            polyfill: false,

            // Default CSS classes
            rangeClass: 'rangeslider',
            disabledClass: 'rangeslider--disabled',
            horizontalClass: 'rangeslider--horizontal',
            verticalClass: 'rangeslider--vertical',
            fillClass: 'rangeslider__fill',
            handleClass: 'rangeslider__handle',

            onInit: function () {
            },
            onSlide: f.debounce(function (position, value) {
                console.log(position, value, slider)
                var years = parseInt(value);
                changeProjection(years);
            }, 15),
            onSlideEnd: function (position, value) {
                var years = Math.round(value);
                $sliderHandle.css('transition', 'left .3s');
                slider.val(years).change();
                setTimeout(function () {
                    $sliderHandle.css('transition', '');
                }, 300);

            }
        });
        var $sliderHandle = $('.rangeslider__handle');

        function changeProjection(year) {
            var blur = (2 * (Object.keys(vals).length - 1)) - (Object.keys(vals).indexOf(String(year)) * 2);
            $horizontView.css('filter', 'blur(' + blur + 'px)');

            transactionCutCountUp.update(vals[year].transactionCut)
            cosmeticsCutCountUp.update(vals[year].cosmetics)
            ladderEntranceCutCountUp.update(vals[year].ladderEntrance)
            ransomCutCountUp.update(vals[year].ransom)
            // $transactionCut.html(vals[year].transactionCut + ' €');
            // $cosmetics.html(vals[year].cosmetics + ' €');
            // $ladderEntrance.html(vals[year].ladderEntrance + ' €');
            // $ransom.html(vals[year].ransom + ' €');
        }
    }

    function initAccodron() {
        var $accordion = $('#accordion');
        var $accordionImgs = $('.accordion-imgs img')
        $accordion.on('shown.bs.collapse', function () {
            var index = $accordion.find('.accordion__body.show').parent('.accordion__block').index();
            console.log($accordionImgs[index]);
            $accordionImgs.removeClass('h-opacity-1').addClass('h-opacity-0');
            $($accordionImgs[index]).removeClass('h-opacity-0').addClass('h-opacity-1');
        })

    }

    function initOrcParticles() {
        /*
       var cv_wrap  = document.getElementById("cv_wrap");
       var cvWidth  = cv_wrap.offsetWidth | 0;
       var cvHeight = cv_wrap.offsetHeight | 0;
       */

        var $section = $('.orc');

        var addWidth = 500;
        // var cvWidth = $section.outerWidth() + addWidth;
        // var cvHeight = $section.outerHeight();
        var cvWidth = 1000;
        var cvHeight = 1000;

        /*
        console.dir(cv_wrap);
        console.log('cvWidth：'+cvWidth);
        console.log('cvHeight：'+cvHeight);
        */

        var renderer = PIXI.autoDetectRenderer(cvWidth, cvHeight, {transparent: true});

        //cv_wrap.appendChild(renderer.view);
        $section.prepend(renderer.view);

        // create the root of the scene graph
        var container = new PIXI.Container();


        var emitter = new PIXI.particles.Emitter(
            container,
            [
                PIXI.Texture.fromImage('assets/img/p1.png'),
                PIXI.Texture.fromImage('assets/img/p2.png'),
                PIXI.Texture.fromImage('assets/img/p3.png')
            ],

            {
                "alpha": {
                    "start": 1,
                    "end": 0
                },
                "scale": {
                    "start": 0.7,
                    "end": 1,
                    "minimumScaleMultiplier": 1
                },
                "color": {
                    "start": "#ffffff",
                    "end": "#9ff3ff"
                },
                "speed": {
                    "start": 5,
                    "end": 8,
                    "minimumSpeedMultiplier": 5
                },
                "acceleration": {
                    "x": -15,
                    "y": 0
                },
                "maxSpeed": 0,
                "startRotation": {
                    "min": 0,
                    "max": 360
                },
                "noRotation": false,
                "rotationSpeed": {
                    "min": 5,
                    "max": 100
                },
                "lifetime": {
                    "min": 2,
                    "max": 8
                },
                "blendMode": "normal",
                "frequency": 0.003,
                "emitterLifetime": -1,
                "maxParticles": 700,
                "pos": {
                    "x": 0,
                    "y": 0
                },
                "addAtBack": false,
                "spawnType": "circle",
                "spawnCircle": {
                    "x": 0,
                    "y": 0,
                    "r": 300
                }
            }
        );

        /*
        console.log('cvWidth / 2 = '+(cvWidth / 2));
        console.log('cvHeight / 2 = '+(cvHeight / 2));
        */

        emitter.updateOwnerPos((cvWidth / 2), (cvHeight / 2));
        // emitter.updateOwnerPos(800, 380);
        emitter.emit = true;

        var elapsed = Date.now();
        var update = function () {

            var now = Date.now();
            emitter.update((now - elapsed) * 0.001);
            elapsed = now;

            renderer.render(container);

            requestAnimationFrame(update);
        };
        update();

        window.onresize = function (event) {
            //renderer.resize($section.outerWidth() + addWidth, $section.outerHeight());
        };
        window.onresize();

    }


    function initPaladinParticles() {
        /*
       var cv_wrap  = document.getElementById("cv_wrap");
       var cvWidth  = cv_wrap.offsetWidth | 0;
       var cvHeight = cv_wrap.offsetHeight | 0;
       */

        var $section = $('.paladin');

        var addWidth = 500;
        // var cvWidth = $section.outerWidth() + addWidth;
        // var cvHeight = $section.outerHeight();
        var cvWidth = 2000;
        var cvHeight = 1000;

        /*
        console.dir(cv_wrap);
        console.log('cvWidth：'+cvWidth);
        console.log('cvHeight：'+cvHeight);
        */

        var renderer = PIXI.autoDetectRenderer(cvWidth, cvHeight, {transparent: true});

        //cv_wrap.appendChild(renderer.view);
        $section.prepend(renderer.view);

        // create the root of the scene graph
        var container = new PIXI.Container();


        var emitter = new PIXI.particles.Emitter(
            container,
            [
                PIXI.Texture.fromImage('assets/img/smokeparticle.png'),
            ],

            {
                "alpha": {
                    "start": 0.5,
                    "end": 0.1
                },
                "scale": {
                    "start": 0.1,
                    "end": 1.5,
                    "minimumScaleMultiplier": 1.1
                },
                "color": {
                    "start": "#5a4d59",
                    "end": "#5a4d59"
                },
                "speed": {
                    "start": 50,
                    "end": 100,
                    "minimumSpeedMultiplier": 1
                },
                "acceleration": {
                    "x": 0,
                    "y": 0
                },
                "maxSpeed": 0,
                "startRotation": {
                    "min": 200,
                    "max": 290
                },
                "noRotation": false,
                "rotationSpeed": {
                    "min": 0,
                    "max": 100
                },
                "lifetime": {
                    "min": 1,
                    "max": 10
                },
                "blendMode": "normal",
                "frequency": 0.001,
                "emitterLifetime": -1,
                "maxParticles": 800,
                "pos": {
                    "x": -250,
                    "y": -25
                },
                "addAtBack": true,
                "spawnType": "rect",
                "spawnRect": {
                    "x": 0,
                    "y": 0,
                    "w": 500,
                    "h": 50
                }
            }
        );

        /*
        console.log('cvWidth / 2 = '+(cvWidth / 2));
        console.log('cvHeight / 2 = '+(cvHeight / 2));
        */

        emitter.updateOwnerPos((cvWidth / 2), cvHeight);
        // emitter.updateOwnerPos(800, 380);
        emitter.emit = true;

        var elapsed = Date.now();
        var update = function () {

            var now = Date.now();
            emitter.update((now - elapsed) * 0.001);
            elapsed = now;

            renderer.render(container);

            requestAnimationFrame(update);
        };
        update();

        window.onresize = function (event) {
            //renderer.resize($section.outerWidth() + addWidth, $section.outerHeight());
        };
        window.onresize();

    }


    function initBussinesSwiper() {
        var swiper;
        toggleSwiper();
        $(window).resize(f.debounce(toggleSwiper, 100));

        function toggleSwiper() {
            var windowWidth = $(window).width() + 17;

            if (windowWidth >= 768) {
                if (swiper && !swiper.destroyed) {
                    swiper.destroy();
                }
            } else {
                if (!swiper || swiper.destroyed) {
                    swiper = new Swiper('.shield-slider', {
                        // Optional parameters
                        loop: true,

                        // If we need pagination
                        pagination: {
                            el: '.shield-slider .swiper-pagination',
                            type: 'bullets',
                            clickable: true,
                            renderBullet: function (index, className) {
                                return '<button class="button -iron ' + className + '">' + (index + 1) + '</button>';
                            }
                        },
                    });
                }

            }

        }
    }

    function initYT() {
        var theModal = '#videoModal';
        var videoSRC = 'https://www.youtube.com/embed/VU0hyAx9meo' + "?autoplay=1";


        $('#videoModal').on('hidden.bs.modal', function (e) {
            $(theModal + ' iframe').attr('src', '');
        });
        $('#videoModal').on('shown.bs.modal', function (e) {
            $(theModal + ' iframe').attr('src', videoSRC);
            $(theModal + ' button.close').click(function () {
                $(theModal + ' iframe').attr('src', '');
            });
        });
    }


    function initDeviceCheck() {
        if (f.detect.isMobile()) {
            $("body").addClass("is-mobile");
        } else {
            $("body").addClass("is-desktop");
        }


        var browser = 'browser-latest';
        if (f.detect.isIEEdge()) {
            browser += ' ie-edge';
        }
        if (f.detect.isIE() && !f.detect.isIEEdge()) {
            browser = 'ie-old';
        }

        $("body").addClass(browser);

    }

    function initOffCanvas() {
        var $body = $("body");
        $(".hamburger").on("click", function (e) {
            e.preventDefault();
            e.stopPropagation();

            $(this).toggleClass("is-active");
            if ($(this).hasClass("is-active")) {
                openOffCanvas(".off-canvas-side-menu");
            } else {
                closeOffCanvas(".off-canvas-side-menu");
            }
        });

        $('.menu-vertical').on("click", function (e) {
            console.log('closing');
            closeOffCanvas($(this).closest(".off-canvas"));
        });

        $(".off-canvas__close").on("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            closeOffCanvas($(this).closest(".off-canvas"));
        });

        $("body").on("click", function (e) {
            if ($(e.target).closest('.off-canvas').length) {
                return;
            }
            if ($body.hasClass("off-canvas-is-active")) {
                closeOffCanvas();
            }
        });

        function openOffCanvas(canvas) {
            // if ($body.hasScrollBar()) {
            //     $body.addClass("has-scrollbar");
            // }
            $body.addClass("has-scrollbar");
            $body.addClass("off-canvas-is-active");
            $body.addClass(canvas.slice(1) + "-is-active");
            $(canvas).addClass("is-visible");
        }


    }


})();
