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

export default menuScroll;
