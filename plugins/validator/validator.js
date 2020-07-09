class Validator {

    constructor({ selector, pattern = {}, method }) {
        this.form = document.querySelector(selector);
        this.pattern = pattern;
        this.method = method;
        this.elemetsForm = [...this.form.elements].filter(item => item.tagName.toLowerCase() !== 'button' &&
                item.type !== 'button');
        this.error = new Set();
    }

    init() {
        this.applyStyle();

        this.elemetsForm.forEach(element => {
            element.addEventListener('change', this.checkIt.bind(this));
        });

        this.setPattern();

        this.form.addEventListener('submit', e => {

            this.elemetsForm.forEach(elem => {
                this.checkIt({target : elem});
            })

            if (this.error.size) {
                e.preventDefault();
            }
        })
    }

    isValid(elem) {
        const validatorMethod = {
            notEmpty(elem) {
                if (elem.value.trim() === '') {
                    return false;
                }
                return true;
            },
            
            pattern(elem,pattern) {
                return pattern.test(elem.value);
            }
        };

        if (this.method) {
            const method = this.method[elem.id];
            if(method) {
                return method.every (item => {
                    return validatorMethod[item[0]](elem, this.pattern[item[1]]);
                });
            }
        } else {
           console.warn('Необходимо передать id полей ввода и методы проверки этих полей!');
        }

        return true;
    }

    checkIt(e) {
        const target = e.target;
        if (this.isValid(target)) {
            this.showSuccess(target);
            this.error.delete(target);
        } else {
            this.showError(target);
            this.error.add(target);
        }
    }

    showError(elem) {
        elem.classList.add('error');
        elem.classList.remove('success');
        if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
            return;
        }
        const errorDiv = document.createElement('div');
        errorDiv.textContent = 'Ошибка в этом поле!';
        errorDiv.classList.add('validator-error');
        elem.insertAdjacentElement('afterend', errorDiv);
    }

    showSuccess(elem) {
        elem.classList.add('success');
        elem.classList.remove('error');

        if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
            elem.nextElementSibling.remove();
        }
    }

    applyStyle() {
        const style = document.createElement('style');
        document.head.appendChild(style);
        style.textContent = `
            input.success {
                border: 2px solid green !important; 
            }

            input.error {
                border: 2px solid red !important;
            }

            .validator-error {
                font-size: 12px !important;
                color: red !important;
            }
         `;
    }

    setPattern() {
        if (!this.pattern.phone)  this.pattern.phone =  /^\+[78]([-()]*\d){13})$/;
        if (!this.pattern.email) this.pattern.email = /^\w+@\w+\.\w{2,}$/;
    }

}

const formPattern = {
    phone: /^\+380\d{7,9}$/,
    zip: /^d{5,7}$/,
    name: /^[а-яА-ЯёЁ\s]+$/,
    message: /^[?!,.а-яА-ЯёЁ0-9\s]+$/
};



const validForm1 = new Validator({
    selector:  '#form1',
    pattern: formPattern,

    method: {
        'form1-name': [
            ['notEmpty'],
            ['pattern', 'name']
        ],
        'form1-phone' : [
            ['notEmpty'],
            ['pattern', 'phone']
        ],
        'form1-email' : [
            ['notEmpty'],
            ['pattern', 'email']
        ],
    }
});

//validForm1.init();


const validForm2 = new Validator({
    selector:  '#form2',
    pattern: formPattern,

    method: {
        'form2-name': [
            ['notEmpty'],
            ['pattern', 'name']
        ],
        'form2-phone' : [
            ['notEmpty'],
            ['pattern', 'phone']
        ],
        'form2-email' : [
            ['notEmpty'],
            ['pattern', 'email']
        ],
        'form2-message': [
            ['notEmpty'],
            ['pattern', 'message']
        ]
    }
});

validForm2.init();

const validForm3 = new Validator({
    selector:  '#form3',
    pattern: formPattern,

    method: {
        'form3-name': [
            ['notEmpty'],
            ['pattern', 'name']
        ],
        'form3-phone' : [
            ['notEmpty'],
            ['pattern', 'phone']
        ],
        'form3-email' : [
            ['notEmpty'],
            ['pattern', 'email']
        ],
    }
});

validForm3.init();
