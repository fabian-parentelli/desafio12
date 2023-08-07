import { TICKET_DAO } from '../dao/index.js';

export default class TicketRepository {

    constructor() { this.dao = TICKET_DAO };

    save = async (ticket) => {
        const result = await this.dao.save(ticket)
        return result;
    };
};