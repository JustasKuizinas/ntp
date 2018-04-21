(function () {
    "use strict";


    $(function () {
        initDeviceCheck();
        initBussinesSwiper();
        initYT();
    });

    function initBussinesSwiper() {
        var swiper;
        toggleSwiper();
        $(window).resize(f.debounce(toggleSwiper, 100));

        function toggleSwiper() {
            var windowWidth = $(window).width();

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
            theModal = $(this).data("target");
            videoSRC = $(this).attr("data-theVideo");
            videoSRCauto = videoSRC + "?autoplay=1";
            $(theModal + ' iframe').attr('src', videoSRCauto);
            $(theModal + ' button.close').click(function () {
                $(theModal + ' iframe').attr('src', videoSRC);
            });
        });

        $('#videoModal').on('hidden.bs.modal', function (e) {
            $(theModal + ' iframe').attr('src', videoSRC);
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
            if ($body.hasScrollBar()) {
                $body.addClass("has-scrollbar");
            }
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