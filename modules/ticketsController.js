const Ticket = require("./Ticket");
const TicketCompletter = require("./TicketFull");

class TicketController {
  constructor(data) {
    this.data = data;
  }

  getAllTickets() {
    const short = this.data.map((elem) => new Ticket(elem))
    return short;
  }

  getTicketById(id) {
    try {
      if (this.data.some((elem) => elem.id === id)) {
        return this.data.find((elem) => elem.id === id);
      }
    }
    catch (err) {
      console.error(err);
    }    
  }

  
  createTicket(name, description) {
    const ticket = new TicketCompletter(name, description)
    this.data.push(ticket);
    return this.getAllTickets();
  }
  
  editTicket(id, name, description) {
    if (this.getTicketById(id)) {
      const ticket = this.getTicketById(id);
      ticket.name = name;
      ticket.description = description;
      ticket.created = getDate();
      return this.getAllTickets();
    }
  }

  deleteTicket(id) {
    if (this.getTicketById(id)) {
      const index = this.data.findIndex((elem) => elem.id === id);
      this.data.splice(index, 1);
      return this.getAllTickets();
    }
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

module.exports = TicketController;