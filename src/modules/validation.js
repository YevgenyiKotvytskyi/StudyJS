const validation = formId => {

    const form = document.getElementById(formId),
        name = /[а-яА-ЯёЁ\s]+/g,
        message = /[?!,.а-яА-ЯёЁ0-9\s]+/g;

    const handlerKey = e => {
        const target = e.target,
            input = target.value;

        let template = null;

        if (input && target.matches('[name=user_name]')) template = name;
        if (input && target.matches('[name=user_message]')) template = message;
        if (template) {
            const arrInput = input.match(template);
            if (arrInput) {
                target.value = arrInput.join('');
            } else {
                target.value = '';
            }
        }

    };

    form.addEventListener('input', handlerKey);

};

export default validation;
