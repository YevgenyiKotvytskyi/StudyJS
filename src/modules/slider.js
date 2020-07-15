
const slider = () => {

    // const reactiveteDots = () => {

    //     document.querySelectorAll('li.dot').forEach(elem => elem.remove());

    //     const portfolioDots = document.querySelector('ul.portfolio-dots');

    //     const dot = document.createElement('li');
    //     dot.classList.add('dot');

    //     document.querySelectorAll('.portfolio-content .portfolio-item').forEach((elem, i) => {
    //         const newNode = dot.cloneNode();
    //         if (i === 0) {
    //             newNode.classList.add('dot-active');
    //         }
    //         portfolioDots.append(newNode);
    //     });

    // };

    // reactiveteDots();


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

export default slider;

