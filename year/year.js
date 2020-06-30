
function message(dadline) {

    function addMessage(message) {
        const element = document.createElement('p');
        element.textContent = message;
        document.body.append(element);
    }

    function dayPart(hour) {

        const
            partOfDay = [
                [-1, 'ночь'],
                [7, 'утро'],
                [12, 'день'],
                [18, 'вечер'],
                [23, 'ночь']
            ];

        let helloPart = '';
        for (const elem of partOfDay) {
            if (elem[0] > hour) break;
            helloPart = elem[1];
        }

        return helloPart;

    }

    const
        today = new Date(),
        dayToNewYear = Math.ceil((new Date('1 january 2021').getTime() - today.getTime())
            / (1000 * 60 * 60 * 24));


    addMessage(`Добрый ${dayPart(today.getHours())}`);

    addMessage('Сегодня ' + today.toLocaleString("ru", { weekday: 'long' }));
    addMessage('Текущее время: ' + today.toLocaleTimeString('en-US'));
    addMessage(`До нового года осталось ${dayToNewYear} дней!`);

}

message(new Date('1 january 2021'));

