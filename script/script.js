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
    //#endregion images

    //#region calc
    const calc = (price = 100)  => {

        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcCount = document.querySelector('.calc-count'),
            calcDay = document.querySelector('.calc-day'),
            totalValue = document.getElementById('total');

        const showResult = result => {
            const delay = 20,
                interval = 2500,
                diff = result / interval * delay,
                stopValue = result - diff;

            let start = 0;

            const timerId = setInterval(() => {
                start += diff;
                if (start < stopValue) {
                    totalValue.textContent = Math.ceil(start);
                } else {
                    clearInterval(timerId);
                    start = result;
                }
                totalValue.textContent =  Math.ceil(start);
            }, delay);
        };


        const handlerCalc = e => {
            const target = e.target;
            let total = 0,
                countValue = 1,
                dayValue = 1;
            if (target.matches('select') || target.matches('input')) {
                const typeValue = calcType.options[calcType.selectedIndex].value,
                    squareValue = +calcSquare.value;

                if (calcCount.value) {
                    countValue += (calcCount.value - 1) / 10;
                }

                if (calcDay.value) {
                    if (calcDay.value < 5) {
                        dayValue *= 2;
                    } else if (calcDay.value < 10) {
                        dayValue *= 1.5;
                    }

                }
                if (typeValue && squareValue)  {
                    total = price * typeValue * squareValue * countValue * dayValue;
                }
            }

            if (total) {
                showResult(total);
            } else {
                totalValue.textContent = total;
            }

        };

        calcBlock.addEventListener('change', handlerCalc);

    };

    calc(100);


    //#endregion

    //#region Ajax запрос
    const sendForm = formId => {

        const errorMessage = 'Что то пошло не так ..',
            loadMessage = 'Загрузка ..',
            successMessage = 'Спасибо! Мы с Вами скоро свяжемся!';

        const form = document.getElementById(formId);

        const statusMessage = document.createElement('div');
        statusMessage.style.cssText =
        `font-size: 2rem;
        color: white;`;

        const createPreloader = () => {
            document.head.insertAdjacentHTML('beforeEnd', '<link rel="stylesheet" href="./css/preloader.css">');
            const element = document.createElement('section');
            // element.style.height = form.offsetHeight + 'px';
            element.classList.add('preloader');
            element.innerHTML = `
                <div class='sk-circle-bounce'>
                <div class='sk-child sk-circle-1'></div>
                <div class='sk-child sk-circle-2'></div>
                <div class='sk-child sk-circle-3'></div>
                <div class='sk-child sk-circle-4'></div>
                <div class='sk-child sk-circle-5'></div>
                <div class='sk-child sk-circle-6'></div>
                <div class='sk-child sk-circle-7'></div>
                <div class='sk-child sk-circle-8'></div>
                <div class='sk-child sk-circle-9'></div>
                <div class='sk-child sk-circle-10'></div>
                <div class='sk-child sk-circle-11'></div>
                <div class='sk-child sk-circle-12'></div>
                </div>
            `;
            element.style.display = 'none';
            return element;
        };

        const preloaderElement = createPreloader();

        const showPreloader = (show = true) => {
            if (show) {
                form.appendChild(preloaderElement);
                preloaderElement.style.top =  `-${form.offsetHeight / 2 + 30}px`;
                preloaderElement.style.display = 'block';
                preloaderElement.style.marginBottom = '-' + preloaderElement.offsetHeight + 'px';
            } else {
                preloaderElement.style.display = 'none';
            }
            [...form.elements].forEach(elem => {
                elem.disabled = show;
            });
        };


        form.addEventListener('submit', e => {

            e.preventDefault();
            // eslint-disable-next-line no-use-before-define
            if (!isValid()) return;
            showPreloader();

            const formData = new FormData(form);
            const body = {};

            formData.forEach((val, key) => {
                body[key] = val;
            });

            // eslint-disable-next-line no-use-before-define
            postData(body,
                () => {
                    showPreloader(false);
                    statusMessage.textContent = successMessage;
                    form.appendChild(statusMessage);
                    [...form.elements].forEach(elem => {
                        if (elem.value) elem.value = '';
                    });

                },
                error => {
                    showPreloader(false);
                    form.appendChild(statusMessage);
                    statusMessage.textContent = errorMessage;
                    console.error(error);
                }
            );
        });


        const isValid = () => {
            const tel = document.querySelector(`#${formId} [type=tel]`),
                phone = /^\+?\d*$/;
            if (tel) {
                if (tel.value.trim() === '' || !phone.test(tel.value)) {
                    tel.style.border = 'solid red';
                    return false;
                } else {
                    tel.style.border = '';
                    return true;
                }
            }
            return true;
        };

        const postData = (body, outputData, errorData) => {

            const request = new XMLHttpRequest();

            request.addEventListener('readystatechange', () => {

                if (request.readyState !== 4) {
                    return;
                }

                if (request.status === 200) {
                    outputData();
                } else {
                    errorData(request.status);
                }

            });

            request.open('POST', './server.php');
            request.setRequestHeader('Content-Type', 'application/json');

            request.send(JSON.stringify(body));

        };

    };

    sendForm('form2');
    sendForm('form3');

    //#endregion

    //#region form input filter
    const validation = formId => {

        const form = document.getElementById(formId),
            name = /[а-яА-ЯёЁ\s]+/g,
            message = /[?!,.а-яА-ЯёЁ0-9\s]+/g;

        const handlerKey = e => {
            const target = e.target;
            if (target.matches('[name=user_name]')) {
                target.value =  [...target.value.matchAll(name)].join('');
            } else if (target.matches('[name=user_message]')) {
                target.value =  [...target.value.matchAll(message)].join('');
            }
        };

        form.addEventListener('input', handlerKey);

    };

    validation('form2');
    validation('form3');
    //#endregion

});
