const { v4: uuidv4 } = require('uuid');

class TicketFull {
  constructor(name, description ) {
    this.id = uuidv4(); // идентификатор (уникальный в пределах системы)
    this.name = name; // краткое описание
    this.description = description || ''; // полное описание
    this.status = false; // boolean - сделано или нет
    this.created = getDate(); // дата создания (timestamp)
  }

  getDate = () => {
    const formatter = new Intl.DateTimeFormat("ru", {
      timeZone: "Europe/Moscow",
      day: "numeric",
      year: "numeric",
      month: "numeric",
      hour: "numeric",
      minute: "numeric"
    });
    return formatter.format(new Date());
  }
}

module.exports = TicketFull;