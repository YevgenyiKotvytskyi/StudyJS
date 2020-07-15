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

export default togglePopUp;
