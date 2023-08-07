import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

export default class Tickets {
    constructor() { this.path = './src/dao/memory/files/tickets.json' };

    save = async (ticket) => {
        const tickets = await this.#getTickets();
        ticket._id = uuidv4();
        tickets.push(ticket);
        await fs.promises.writeFile(this.path, JSON.stringify(tickets, null, '\t'));
        return ticket;
    };

    #getTickets = async () => {
        if (fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const tikets = JSON.parse(data);
            return tikets;
        } else {
            { [] };
        };
    }
};