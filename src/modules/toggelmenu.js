const toggelmenu = () => {

    const menu = document.querySelector('menu');

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

export default toggelmenu;
