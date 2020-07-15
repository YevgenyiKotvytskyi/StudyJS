const calc = (price = 100)  => {

    const calcBlock = document.querySelector('.calc-block'),
        calcType = document.querySelector('.calc-type'),
        calcSquare = document.querySelector('.calc-square'),
        calcCount = document.querySelector('.calc-count'),
        calcDay = document.querySelector('.calc-day'),
        totalValue = document.getElementById('total');

    const showResult = result => {
        const delay = 20,
            interval = 2500,
            diff = result / interval * delay,
            stopValue = result - diff;

        let start = 0;

        const timerId = setInterval(() => {
            start += diff;
            if (start < stopValue) {
                totalValue.textContent = Math.ceil(start);
            } else {
                clearInterval(timerId);
                start = result;
            }
            totalValue.textContent =  Math.ceil(start);
        }, delay);
    };


    const handlerCalc = e => {
        const target = e.target;
        let total = 0,
            countValue = 1,
            dayValue = 1;
        if (target.matches('select') || target.matches('input')) {
            const typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSquare.value;

            if (calcCount.value) {
                countValue += (calcCount.value - 1) / 10;
            }

            if (calcDay.value) {
                if (calcDay.value < 5) {
                    dayValue *= 2;
                } else if (calcDay.value < 10) {
                    dayValue *= 1.5;
                }

            }
            if (typeValue && squareValue)  {
                total = price * typeValue * squareValue * countValue * dayValue;
            }
        }

        if (total) {
            showResult(total);
        } else {
            totalValue.textContent = total;
        }

    };

    calcBlock.addEventListener('change', handlerCalc);
};

export default calc;
