class Ticket {
  constructor(ticket) {
    this.id = ticket.id; // идентификатор (уникальный в пределах системы)
    this.name = ticket.name; // краткое описание
    this.status = ticket.status; // boolean - сделано или нет
    this.created = ticket.created; // дата создания (timestamp)
  }
}

module.exports = Ticket;
