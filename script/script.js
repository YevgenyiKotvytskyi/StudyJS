
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
            console.log('target: ', target);

            if (target.classList.contains('close-btn') ||
                target.closest('.menu') ||
                target.closest('li')
            ) {
                console.log('target: ', target, target.closest('.menu'));
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
            popupBtn = document.querySelectorAll('.popup-btn'),
            popUpClose = document.querySelector('.popup-close');

        popupBtn.forEach(elem => {
            elem.addEventListener('click', () => {
                popup.style.display = 'block';
            });
        });

        popUpClose.addEventListener('click', () => popup.style.display = 'none');

    };

    togglePopUp();
    //#endregion popup

    //#region menu scroll

    const menuScroll = () => {

        const menuItems = document.querySelectorAll('ul>li'),
            serviceLink = document.querySelector("a[href='#service-block']");

        const moveScroll = finishPosition => {

            const start = Date.now(),
                startPosition = document.documentElement.scrollTop,
                lasting = 1000,
                delay = 20,
                addScale = (finishPosition - startPosition) / lasting;

            const timer = setInterval(() => {

                const timePassed = Date.now() - start;

                if (timePassed > 1000) {
                    clearInterval(timer);
                    document.documentElement.scrollTop = finishPosition;
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

});
