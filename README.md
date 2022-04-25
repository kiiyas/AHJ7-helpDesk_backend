### HelpDesk

#### Сервер на <a href="https:........herokuapp.com/">Heroku</a>

#### <a href="https:///">Github Pages</a>

#### <a href="https://github.com/">Frontend part</a>


Прототип API для сервиса управления заявками на помощь, к которому нужно будет в дальнейшем прикруить frontend.

Для хранения данных используются структуры:
```javascript
Ticket {
    id // идентификатор (уникальный в пределах системы)
    name // краткое описание
    status // boolean - сделано или нет
    created // дата создания (timestamp)
}

TicketFull {
    id // идентификатор (уникальный в пределах системы)
    name // краткое описание
    description // полное описание
    status // boolean - сделано или нет
    created // дата создания (timestamp)
}
```

Напишите сервер с использованием koa, который работает по следующей схеме:
* GET    ?method=allTickets           - список тикетов
* GET    ?method=ticketById&id=`<id>` - полное описание тикета (где `<id>` - идентификатор тикета)
* POST   ?method=createTicket         - создание тикета (`<id>` генерируется на сервере, в теле формы `name`, `description`, `status`)

Соответственно:
* GET    ?method=allTickets           - массив объектов типа `Ticket` (т.е. без `description`)
* GET    ?method=ticketById&id=`<id>` - объект типа `TicketFull` (т.е. с `description`)
* POST   ?method=createTicket         - в теле запроса форма с полями для объекта типа `Ticket` (с `id` = `null`)

Сервер необходимо развернуть на Heroku. Для упрощения тестирования можете при старте сервера добавлять туда несколько тикетов.

Для того, чтобы с сервера отдавать данные, достаточно в обработчиках koa написать:
```js
const tickets = [];

app.use(async ctx => {
    const { method } = ctx.request.query; // важно: в лекции опечатка, должно быть query

    switch (method) {
        case 'allTickets':
            ctx.response.body = tickets;
            return;
        // TODO: обработка остальных методов
        default:
            ctx.response.status = 404;
            return;
    }
});
```

Для того, чтобы обработать полученный ответ во Frontend, достаточно вот этого кода:
```js
xhr.addEventListener('load', () => {
    if (xhr.status >= 200 && xhr.status < 300) {
        try {
            const data = JSON.parse(xhr.responseText);
        } catch (e) {
            console.error(e);
        }
    }
});
```
