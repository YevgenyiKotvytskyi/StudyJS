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

export default validation;
