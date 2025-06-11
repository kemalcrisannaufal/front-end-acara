interface ITicket {
  _id?: string;
  name: string;
  event?: string;
  description: string;
  price: number;
  quantity: number;
}

interface ITicketForm extends ITicket {
  price: string;
  quantity: string;
}

interface ICart {
  events: string;
  ticket: string;
  quantity: number;
}

export { ITicket, ITicketForm, ICart };
