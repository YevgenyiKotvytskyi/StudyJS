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

export default imageHover;
