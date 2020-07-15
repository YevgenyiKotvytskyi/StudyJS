function countTimer(deadline) {
    const
        timerHour = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds'),
        dateStop = new Date(deadline).getTime();

    function getTimeRemaining() {
        const
            dateNow = new Date().getTime(),
            timeRemaining = (dateStop - dateNow) / 1000,
            seconds = Math.floor(timeRemaining % 60),
            minutes = Math.floor((timeRemaining / 60) % 60),
            hours = Math.floor((timeRemaining / 60 / 60));

        return { hours, minutes, seconds };
    }

    function updateClock() {
        const timer = getTimeRemaining();

        let seconds = timer.seconds;
        if (seconds <= 0) seconds = 0;

        timerHour.textContent = ('0' + ((timer.hours > 0) ? timer.hours : 0))
            .slice(-2);
        timerMinutes.textContent = ('0' + ((timer.minutes > 0) ? timer.minutes : 0))
            .slice(-2);


        timerSeconds.textContent =  ('00' + seconds).slice(-2);
        //eslint-disable-next-line no-use-before-define
        if (timer.seconds < 0) clearInterval(timerId);
    }

    const timerId = setInterval(updateClock, 1000);
}

export default countTimer;
