
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

    countTimer('31 juny 2020 14:00');

    // -- menu --

    const toggelmenu = () => {

        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            btnClose = document.querySelector('.close-btn'),
            menuItems = document.querySelectorAll('ul>li');

        const moveMenu = animation => {

            const start = Date.now();
            const startPosition = -100,
                direction = (menu.style.transform === 'translateX(100%)') ? -1 : 1;

            if (animation) {
                const timer = setInterval(() => {

                    const timePassed = Date.now() - start;

                    if (timePassed > 1000) {
                        clearInterval(timer);
                        menu.style.transform = `translateX(${direction * (100)}%)`;
                        return;
                    }

                    draw(timePassed);

                }, 20);
            } else {
                menu.style.transform = `translateX(${direction * (100)}%)`;
            }

            function draw(timePassed) {
                menu.style.transform = `translateX(${direction * (startPosition + timePassed / 5)}%)`;
            }

        };

        const handlerMenu = () => {
            const animation = (document.documentElement.clientWidth > 768);
            moveMenu(animation);

            //menu.classList.toggle('active-menu');
        };

        btnMenu.addEventListener('click', handlerMenu);

        btnClose.addEventListener('click', handlerMenu);

        menuItems.forEach(elem => {
            elem.addEventListener('click', handlerMenu);
        });

    };

    toggelmenu();



    // -- popup --

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


});
