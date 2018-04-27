(function () {
    "use strict";


    $(function () {
        initDeviceCheck();
        initBussinesSwiper();
        initYT();
        initOffCanvas();
        initOrcParticles();
        initPaladinParticles();
        initAccodron();
        initRangeSlider()
        initTextSlider();
        initSticky();
    });

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
        var $transactionCut = $('.calc .transaction-cut');
        var $cosmetics = $('.calc .cosmetics');
        var $ladderEntrance = $('.calc .ladder-entrance');
        var $ransom = $('.calc .ransom');
        var $horizont = $('.horizont');

        var vals = {
            2018: {
                'transactionCut': 1,
                'cosmetics': 2,
                'ladderEntrance': 3,
                'ransom': 4
            },
            2019: {
                'transactionCut': 5,
                'cosmetics': 6,
                'ladderEntrance': 7,
                'ransom': 8
            },
            2020: {
                'transactionCut': 9,
                'cosmetics': 10,
                'ladderEntrance': 11,
                'ransom': 12
            },
            2021: {
                'transactionCut': 13,
                'cosmetics': 14,
                'ladderEntrance': 15,
                'ransom': 16
            },
            2022: {
                'transactionCut': 17,
                'cosmetics': 18,
                'ladderEntrance': 19,
                'ransom': 20
            }
        }


        changeProjection(Object.keys(vals)[0]);

        $('.calc input[type="range"]').rangeslider({
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
                changeProjection(value);
            }, 15),
            onSlideEnd: function (position, value) {

            }
        });

        function changeProjection(year) {
            var opacity = (1 / Object.keys(vals).length) * (Object.keys(vals).indexOf(String(year)) + 1);
            $horizont.css('opacity', opacity);

            $transactionCut.html(vals[year].transactionCut + ' €');
            $cosmetics.html(vals[year].cosmetics + ' €');
            $ladderEntrance.html(vals[year].ladderEntrance + ' €');
            $ransom.html(vals[year].ransom + ' €');
        }
    }

    function initAccodron() {
        var $accordion = $('#accordion');
        var $accordionImgs = $('.accordion-imgs img')
        $accordion.on('shown.bs.collapse', function () {
            var index = $accordion.find('.accordion__body.show').parent('.accordion__block').index();
            console.log($accordionImgs[index]);
            $accordionImgs.hide();
            $($accordionImgs[index]).show();
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
        var videoSRC = 'https://www.youtube.com/embed/f4uO7miigQw' + "?autoplay=1";


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

        function closeOffCanvas(canvas) {
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
        }
    }


})();