
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

export default tab;
