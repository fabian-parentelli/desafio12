import TicketRepository from '../repsitories/tickets.repository.js';
import { v4 as uuidv4 } from 'uuid';

const ticketRepository = new TicketRepository();

const save = async (user, amount) => {

    const newTicket = {
        code: uuidv4(),
        purchase_datetime: new Date().toLocaleString(),
        amount,
        purchaser: user.email
    };

    const result = await ticketRepository.save(newTicket);
    return result;
};

export { save };