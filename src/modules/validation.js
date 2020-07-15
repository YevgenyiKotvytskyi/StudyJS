const validation = formId => {

    const form = document.getElementById(formId),
        name = /[а-яА-ЯёЁ\s]+/g,
        message = /[?!,.а-яА-ЯёЁ0-9\s]+/g;

    const handlerKey = e => {
        const target = e.target,
            key = event.key;
        if (target.matches('[name=user_name]')) {
            if (!key.match(name)) event.preventDefault();
        } else if (target.matches('[name=user_message]')) {
            if (!key.match(message)) event.preventDefault();
        }
    };

    form.addEventListener('keypress', handlerKey);

};

export default validation;
