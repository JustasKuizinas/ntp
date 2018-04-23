(function () {
    "use strict";


    $(function () {
        initDeviceCheck();
        initBussinesSwiper();
        initYT();
        initOffCanvas();
        initParticles();
        initAccodron();
    });

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

    function initParticles() {
        var app = new PIXI.Application();
        console.log(app);
        //$('.orc').append(app.view);

        var emitter = new PIXI.particles.Emitter(
            // The PIXI.Container to put the emitter in
            // if using blend modes, it's important to put this
            // on top of a bitmap, and not use the root stage Container
            app.container,

            [PIXI.Texture.fromImage('image.jpg')],

            {
                alpha: {
                    list: [
                        {
                            value: 0.8,
                            time: 0
                        },
                        {
                            value: 0.1,
                            time: 1
                        }
                    ],
                    isStepped: false
                },
                scale: {
                    list: [
                        {
                            value: 1,
                            time: 0
                        },
                        {
                            value: 0.3,
                            time: 1
                        }
                    ],
                    isStepped: false
                },
                color: {
                    list: [
                        {
                            value: "fb1010",
                            time: 0
                        },
                        {
                            value: "f5b830",
                            time: 1
                        }
                    ],
                    isStepped: false
                },
                speed: {
                    list: [
                        {
                            value: 200,
                            time: 0
                        },
                        {
                            value: 100,
                            time: 1
                        }
                    ],
                    isStepped: false
                },
                startRotation: {
                    min: 0,
                    max: 360
                },
                rotationSpeed: {
                    min: 0,
                    max: 0
                },
                lifetime: {
                    min: 0.5,
                    max: 0.5
                },
                frequency: 0.008,
                spawnChance: 1,
                particlesPerWave: 1,
                emitterLifetime: 0.31,
                maxParticles: 1000,
                pos: {
                    x: 0,
                    y: 0
                },
                addAtBack: false,
                spawnType: "circle",
                spawnCircle: {
                    x: 0,
                    y: 0,
                    r: 10
                }
            }
        );

        var elapsed = Date.now();

        var update = function () {
            requestAnimationFrame(update);
            var now = Date.now();
            emitter.update((now - elapsed) * 0.001);
            elapsed = now;

            // Should re-render the PIXI Stage
            app.renderer.render(app.stage);
        };

        emitter.emit = true;
        update();

        // PIXI.loader.add('bunny', 'bunny.png').load((loader, resources) => {
        //         // This creates a texture from a 'bunny.png' image
        //         const bunny = new PIXI.Sprite(resources.bunny.texture);
        //
        //     // Setup the position of the bunny
        //     bunny.x = app.renderer.width / 2;
        //     bunny.y = app.renderer.height / 2;
        //
        //     // Rotate around the center
        //     bunny.anchor.x = 0.5;
        //     bunny.anchor.y = 0.5;
        //
        //     // Add the bunny to the scene we are building
        //     app.stage.addChild(bunny);
        //
        //     // Listen for frame updates
        //     app.ticker.add(() => {
        //         // each frame we spin the bunny around a bit
        //         bunny.rotation += 0.01;
        // });
        // });
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
        var trigger = $("body").find('[data-toggle="modal"]');
        var theModal,
            videoSRC,
            videoSRCauto;

        trigger.click(function () {
            var that = this;
            setTimeout(function () {
                theModal = $(that).data("target");
                videoSRC = $(that).attr("data-theVideo");
                videoSRCauto = videoSRC + "?autoplay=1";
                $(theModal + ' iframe').attr('src', videoSRCauto);
                $(theModal + ' button.close').click(function () {
                    $(theModal + ' iframe').attr('src', videoSRC);
                });
            }, 300);

        });

        $('#videoModal').on('hidden.bs.modal', function (e) {
            $(theModal + ' iframe').attr('src', '');
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