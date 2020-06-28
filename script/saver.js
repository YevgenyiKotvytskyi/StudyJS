class Saver{

    constructor(obj, key, days){
        this.obj = obj;
        this.key = key; 
        this.days = days;
    }

    readElements() {
        const inputs = document.querySelectorAll('.data input');
        this.elements = {};
        for (let i = 0 ; i < inputs.length; i++) {
            let name = '';
            if ( inputs[i].id ){
                name = `i${ (i + 100).toString().slice(-3)}_${inputs[i].id}`;
            } else {
                name = `i${ ('00' + i).slice(-3)}_${inputs[i].className}`;
            }
            if (inputs[i].getAttribute('type') ==='checkbox') {
                this.elements[name] = inputs[i].checked;
            } else {
                this.elements[name] = inputs[i].value;
            }
        }
        let i = Object.keys(this.elements).length; 
        let name = `i${ (i + 200).toString().slice(-3)}_deposit-bank`;
        this.elements[name] = depositBank.value;
    }

    saveToStorage(){
        this.readElements();
        localStorage.setItem(this.key, JSON.stringify(this.elements));
    }

    saveToCookies(){
        this.deleteAllCookies();
        for (const key in this.elements) {
            this.setCookie(key);
            this.setCookie('isLoad', true);
        }

    }

    setCookie(name, value = null) {
        if (!value) value = this.elements[name];
        let expires = "";
        if (this.days) {
            let date = new Date();
            date.setDate(date.getDate() + this.days);
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + ( value )  + expires + "; path=/";
    }

    getStoredCookie(name) {
        let nameEQ = name + "=";
        for(let i=0;i < this.cookies.length;i++) {
            let c = this.cookies[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    deleteAllCookies() {
        
        let cookies = document.cookie.split(";");
    
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i];
            let eqPos = cookie.indexOf("=");
            let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
    }

    isCookiesCorrect() {

        let result = true; 
        for (const property in this.elements) {
            const cookiesValue = this.getStoredCookie(property);
            if (!(cookiesValue === this.elements[property].toString())) {
                result = false;
                break;
            }
        }
        return result;
    }
    
    writeToHTML(){

        this.elements = JSON.parse(localStorage.getItem(this.key));
        this.cookies = document.cookie.split(';');
        if (!this.isCookiesCorrect()) {
            this.deleteAllCookies();
            localStorage.clear();
            appData.resetDataHandler.call(appData);
            return;
        }
        
        const classes = [];

        const setValue = (valKey, element ) => {
            if (!element) console.log(valKey, element);
            if ( element.getAttribute('type') ==='checkbox') {
                element.checked = this.elements[valKey];
            } else {
                element.value = this.elements[valKey]; 
            }
        };

        for (const key in this.elements) {
            const elementId = key.substring(5);
            const keyIndex = key.substring(1,4);
            if ( keyIndex < '100') {

                let classCount = 0; 
                classes.forEach ( (elem) => {
                    if (elem === elementId ) classCount++;
                });

                classes.push(elementId);
                if (classCount) {
                    this.addMultyInput(elementId, classCount, this.elements[key]);
                } else {
                    setValue(key, document.querySelector('input.'+elementId));
                }
                
            } else if (keyIndex < '200') {
                setValue(key, document.getElementById(elementId));
            } else if (keyIndex < '300'){
                setValue(key, document.querySelector('select.'+elementId));
            }
        }
   
        calculate.disabled = false;
        appData.depositHandler.call(appData);
        const percent = depositPercent.value;
        if (checkboxDeposit.checked) appData.selectHandler.call(appData);
        depositPercent.value = percent ; 
        periodAmount.textContent = periodSelect.value;

    }

    addMultyInput( className, index, value) {
        const input = document.querySelectorAll('input.' + className);
        if (input.length > index) {
            input[index].value = value;
        } else {
            if ( className === 'income-title' ) {
                const button = document.querySelector('.btn_plus.income_add');
                const cloneElement = document.querySelector('.income-items').cloneNode(true);
                cloneElement.querySelectorAll('input').forEach( element => element.value = '');
                button.parentNode.insertBefore(cloneElement,button);
                cloneElement.querySelector('.' + className).value = value;
                if (index == 2) button.style.display = 'none';

            } else if (className === 'expenses-title') {
                const button = document.querySelector('.btn_plus.expenses_add');
                const cloneElement = document.querySelector('.expenses-items').cloneNode(true);
                cloneElement.querySelectorAll('input').forEach( element => element.value = '');
                button.parentNode.insertBefore(cloneElement,button);
                cloneElement.querySelector('.' + className).value = value;
                if (index == 2) button.style.display = 'none';
            }
        }

    }


    clearLocalStorage(){
        localStorage.clear();
    }

    eventListener(){

        calculate.addEventListener('click', this.saveToStorage.bind(this) );
        calculate.addEventListener('click', this.saveToCookies.bind(this) );
        cancelButton.addEventListener('click', this.clearLocalStorage.bind(this))
        window.addEventListener('load', this.writeToHTML.bind(this) );

    }

}

const saver = new Saver(appData,'appData', 14 );
saver.eventListener();
