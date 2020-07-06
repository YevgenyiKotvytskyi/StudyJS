
window.addEventListener('DOMContentLoaded', () => {
//    'use strict';

    function countTimer(deadline) {
        const
            timerHour = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds'),
            dateStop = new Date(deadline).getTime();

        function getTimeRemaining() {
            const
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor((timeRemaining / 60 / 60));

            return { hours, minutes, seconds };
        }

        function updateClock() {
            const timer = getTimeRemaining();
            timerHour.textContent = ('0' + ((timer.hours > 0) ? timer.hours : 0))
                .slice(-2);
            timerMinutes.textContent = ('0' + ((timer.minutes > 0) ? timer.minutes : 0))
                .slice(-2);
            timerSeconds.textContent =  ('00' + ((timer.seconds > 0) ? timer.seconds : 0))
                .slice(-2);
            if (timer.seconds < 0) clearInterval(timerId);
        }

        const timerId = setInterval(updateClock, 1000);


    }

    countTimer('02 july 2020 14:00');

    //#region menu

    const toggelmenu = () => {

        const menu = document.querySelector('menu');

        // const moveMenu = animation => {

        //     const start = Date.now();
        //     const startPosition = -100,
        //         direction = (menu.style.transform === 'translateX(100%)') ? -1 : 1;

        //     if (animation) {
        //         const timer = setInterval(() => {

        //             const timePassed = Date.now() - start;

        //             if (timePassed > 1000) {
        //                 clearInterval(timer);
        //                 menu.style.transform = `translateX(${direction * (100)}%)`;
        //                 return;
        //             }

        //             draw(timePassed);

        //         }, 20);
        //     } else {
        //         menu.style.transform = `translateX(${direction * (100)}%)`;
        //     }

        //     function draw(timePassed) {
        //         menu.style.transform = `translateX(${direction * (startPosition + timePassed / 5)}%)`;
        //     }

        // };

        const handlerMenu = event => {

            const target = event.target;

            if (target.classList.contains('close-btn') ||
                target.closest('.menu') ||
                target.closest('menu li')
            ) {
                menu.classList.toggle('active-menu');
            } else {
                if (!target.closest('menu')) {
                    menu.classList.remove('active-menu');
                }
            }
        };

        document.body.addEventListener('click', handlerMenu);
    };

    toggelmenu();

    //#endregion menu

    //#region popup

    const togglePopUp = () => {

        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn');

        popupBtn.forEach(elem => {
            elem.addEventListener('click', () => {
                popup.style.display = 'block';
            });
        });

        popup.addEventListener('click', event => {
            const target = event.target;
            if (target.matches('.popup-close') || !target.closest('.popup-content')) {
                popup.style.display = 'none';
            }

        });

    };

    togglePopUp();
    //#endregion popup

    //#region menu scroll

    const menuScroll = () => {

        const menuItems = document.querySelectorAll('ul>li'),
            serviceLink = document.querySelector("a[href='#service-block']");

        const moveScroll = finishPosition => {

            const start = Date.now(),
                startPosition =  document.documentElement.scrollTop,
                lasting = 1000,
                delay = 20,
                addScale = finishPosition / lasting;

            const timer = setInterval(() => {

                const timePassed = Date.now() - start;

                if (timePassed > 1000) {
                    clearInterval(timer);
                    document.documentElement.scrollTop = startPosition + finishPosition;
                    return;
                }

                draw(timePassed);

            }, delay);

            function draw(timePassed) {
                document.documentElement.scrollTop = startPosition + timePassed * addScale;
            }

        };

        const scrollToLink = link => {
            if (link) {
                const linkElement = document.querySelector(link.getAttribute("href"));
                const refTop = linkElement.getBoundingClientRect().top;
                moveScroll(refTop);
            }
        };

        const handlerMenuScroll = event => {
            event.preventDefault();
            const link = event.target.closest('a');
            scrollToLink(link);
        };

        serviceLink.addEventListener('click', handlerMenuScroll);

        menuItems.forEach(elem => {
            elem.addEventListener('click', handlerMenuScroll);
        });

    };

    menuScroll();

    //#endregion menu scroll

    //#region menu tabs

    const tab = () => {

        const serviceHeaderTabs = document.querySelectorAll('.service-header .service-header-tab'),
            serviceHeader = document.querySelector('.service-header'),
            serviceTabs = document.querySelectorAll('.service-tab');

        const handlerHeader = event => {

            const target = event.target;

            const showPanel = index => {
                serviceTabs.forEach((elem, i) => {
                    if (index === i) {
                        elem.classList.remove('d-none');
                    } else {
                        elem.classList.add('d-none');
                    }
                });
            };

            const botton = target.closest('.service-header-tab');

            if (botton) {

                serviceHeaderTabs.forEach((elem, i) => {

                    if (elem === botton) {
                        elem.classList.add('active');
                        showPanel(i);
                    } else {
                        elem.classList.remove('active');
                    }

                });
            }
        };

        serviceHeader.addEventListener('click', handlerHeader);

    };

    tab();

    //#endregion menu tabs

    //#region menu slider

    const slider = () => {

        const reactiveteDots = () => {

            document.querySelectorAll('li.dot').forEach(elem => elem.remove());

            const portfolioDots = document.querySelector('ul.portfolio-dots');

            const dot = document.createElement('li');
            dot.classList.add('dot');

            document.querySelectorAll('.portfolio-content .portfolio-item').forEach((elem, i) => {
                const newNode = dot.cloneNode();
                if (i === 0) {
                    newNode.classList.add('dot-active');
                }
                portfolioDots.append(newNode);
            });

        };

        reactiveteDots();


        const slide = document.querySelectorAll('.portfolio-item'),
            slider = document.querySelector('.portfolio'),
            dots = document.querySelectorAll('.dot');


        let currentSlide = 0,
            innterval,
            slideInterval;

        const pervSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoplaySlide = () => {
            pervSlide(slide, currentSlide, 'portfolio-item-active');
            pervSlide(dots, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) currentSlide = 0;
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dots, currentSlide, 'dot-active');
        };

        const startSlide = () => {
            if (!slideInterval) slideInterval = 3000;
            innterval = setInterval(autoplaySlide, slideInterval);
        };

        const stopSlide = () => {
            clearInterval(innterval);
        };

        slider.addEventListener('click', event => {
            event.preventDefault();
            const target = event.target;

            if (target.matches('#arrow-left, #arrow-right, .dot')) {

                pervSlide(slide, currentSlide, 'portfolio-item-active');
                pervSlide(dots, currentSlide, 'dot-active');

                if (target.matches('#arrow-right')) {
                    currentSlide++;
                } else if (target.matches('#arrow-left')) {
                    currentSlide--;
                } else if (target.matches('.dot')) {
                    dots.forEach((elem, index) => {
                        if (elem === target) currentSlide = index;
                    });
                }

                if (currentSlide >= slide.length) {
                    currentSlide = 0;
                } else if (currentSlide < 0) {
                    currentSlide = slide.length - 1;
                }

                nextSlide(slide, currentSlide, 'portfolio-item-active');
                nextSlide(dots, currentSlide, 'dot-active');
            }


        });

        slider.addEventListener('mouseover', event => {
            if (event.target.matches('.portfolio-btn, .dot')) {
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', event => {
            if (event.target.matches('.portfolio-btn, .dot')) {
                startSlide();
            }
        });


        slideInterval = 1500;
        startSlide();

    };

    slider();

    //#endregion menu slider

    //#region images&calc input
    const imageHover = () => {

        const command = document.getElementById('command'),
            calcBlock = document.getElementById('calc');

        // eslint-disable-next-line no-undef

        const handlerMouseHover = e => {
            const target = e.target;
            if (target.matches('img.command__photo')) {

                if (!target.mainPhoto)  {
                    target.mainPhoto = target.getAttribute('src');
                    target.setAttribute('src', target.dataset.img);
                    return;
                }

                if (target.getAttribute('src') !== target.mainPhoto) {
                    target.setAttribute('src', target.mainPhoto);
                } else {
                    target.setAttribute('src', target.dataset.img);
                }

            }
        };

        const handlerInputDigits = e => {
            const target = e.target;
            //            debugger;
            if (target.matches('input.calc-item')) {
                target.value = target.value.replace(/\D/, '');
                //                const key = e.key;
                //                if (!(key.match(/\d|\./))) e.preventDefault();
            }
        };

        command.addEventListener('mouseover', handlerMouseHover);

        command.addEventListener('mouseout', handlerMouseHover);

        calcBlock.addEventListener('input', handlerInputDigits);

    };

    imageHover();
    ////#endregion images

});
