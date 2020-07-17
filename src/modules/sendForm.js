const sendForm = formId => {

    const errorMessage = 'Что то пошло не так ..',
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

        e.preventDefault();
        // eslint-disable-next-line no-use-before-define
        if (!isValid()) return;

        const formData = new FormData(form);
        const body = {};
        showPreloader();

        formData.forEach((val, key) => {
            body[key] = val;
        });

        const succesPost = () => {
            showPreloader(false);
            statusMessage.textContent = successMessage;
            form.appendChild(statusMessage);
            [...form.elements].forEach(elem => {
                if (elem.value) elem.value = '';
            });
        };

        const errorPost = error => {
            showPreloader(false);
            form.appendChild(statusMessage);
            statusMessage.textContent = errorMessage;
            console.error(error);
        };

        // eslint-disable-next-line no-use-before-define
        postData(body, succesPost, errorPost);
    });


    const postData = (body, succesPost, errorPost) => {
        fetch('./server.php',
            {
                method: 'POST',
                mode: 'same-origin',
                cache: 'default',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            .then(response => {
                if (response.status !== 200) throw new Error('Status network 200!');
                succesPost();
            })
            .catch(error => {
                errorPost(error);
            });
    };

};

export default sendForm;
