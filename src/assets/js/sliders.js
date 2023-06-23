import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import Swiper, { Navigation, Pagination, Autoplay, Thumbs } from 'swiper'

Swiper.use([Navigation, Pagination, Autoplay, Thumbs])

export default function sliders() {
    // get all sliders, we need to loop them due to different settings + nav
    var swipers = document.querySelectorAll(
        '.swiper:not(.control):not(.mobile)'
    );

    swipers.forEach(function (el, index) {
        var closestSection = el.closest('section');
        var controls = closestSection.querySelector('.control');
        var paginationEl = closestSection.querySelector('.swiper-pagination');
        var nextEl = closestSection.querySelector('.swiper-button-next');
        var prevEl = closestSection.querySelector('.swiper-button-prev');

        // slider settings
        var options = {
            speed: 600,
            loop: true,
            loopAdditionalSlides: 4,
            slideToClickedSlide: true,
            breakpoints: {
                992: {
                    allowTouchMove: false,
                }
            },
            autoplay: {
                delay: 5000,
                disableOnInteraction: true,
            },
            navigation: {
                nextEl: (nextEl ? nextEl : ''),
                prevEl: (prevEl ? prevEl : ''),
            },
            pagination: {
                el: (paginationEl ? paginationEl : ''),
                clickable: true,
            },
            thumbs:{}
        }

        if(el.classList.contains('swiper-cutoff')){
            options.slidesPerView = 1;
            options.spaceBetween = 30;
            options.centeredSlides = true;
            options.breakpoints = {
                992: {
                    slidesPerView: 1,
                    spaceBetween: 80
                }
            };
        }
        if(el.classList.contains('reviews')){
            options.slidesPerView = 1;
            options.spaceBetween = 10;
            options.centeredSlides = true;
            options.breakpoints = {
                1200: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                1440: {
                    slidesPerView: 3,
                    spaceBetween: 22
                }
            };
        }

        // For gallery sliders
        if (controls) {
            options.thumbs.swiper = new Swiper(controls, {
                speed: 600,
                loop: true,
                slidesPerView: 2,
                spaceBetween: 10,
                centeredSlides: true,
                watchSlidesVisibility: true,
                watchSlidesProgress: true,
                controller: {},
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: true,
                },
                breakpoints: {
                    640: {
                        slidesPerView: 3,
                    },
                    992: {
                        slidesPerView: 4,
                    }
                }
            });
        }

        let mainSwiper = new Swiper(el, options);

        // pause autoplay when video starts, as disableOnInteraction doesnt alway work
        let videoButtons = closestSection.querySelectorAll('.play-button');
        videoButtons.forEach(function(el, index){
            el.addEventListener('click', function(){
                mainSwiper.autoplay.stop();
            });
        });

        // stop video on slide change
        mainSwiper.on('slideChange', function () {
            let activeVideo = closestSection.querySelector('iframe:not([src="about:blank"])');
            if(activeVideo){
                activeVideo.src = 'about:blank';
                activeVideo.closest('.video-preview-container').classList.remove('playing');
            }
        });
    });
    
    // Load More Gallery feature
    // var hiddenSlides = $('.extended-gallery .swiper-slide.extra-slide')
    // if (!hiddenSlides.length) {
    //     $('.load-more-gallery').hide()
    // }
    // $(document).on(
    //     'click',
    //     '.extended-gallery .load-more-gallery',
    //     function (event) {
    //         hiddenSlides = $('.extended-gallery .swiper-slide.extra-slide')
    //         if (hiddenSlides.length <= 3) {
    //             $(this).hide()
    //         } else {
    //             for (var i = 0; i < 3; i++) {
    //                 var slide = hiddenSlides[i]
    //                 $(slide).removeClass('extra-slide')
    //                 $(slide).fadeIn(500)
    //             }
    //         }
    //     }
    // )
}

//
