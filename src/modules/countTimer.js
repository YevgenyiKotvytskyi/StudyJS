function countTimer(deadline) {
    const
        timerHour = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds'),
        dateStop = new Date(deadline).getTime();

    const timerId = setInterval(updateClock, 1000);

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
        timerHour.textContent = ('0' + ((timer.hours > 0) ? timer.hours : 0))
            .slice(-2);
        timerMinutes.textContent = ('0' + ((timer.minutes > 0) ? timer.minutes : 0))
            .slice(-2);
        timerSeconds.textContent =  ('00' + ((timer.seconds > 0) ? timer.seconds : 0))
            .slice(-2);
        if (timer.seconds < 0) clearInterval(timerId);
    }
}

export default countTimer;
