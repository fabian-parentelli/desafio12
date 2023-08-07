import { ticketModel } from "../models/tikets.model.js";

export default class Ticket {
    
    constructor() {};
    
    save = async (ticket) => {
        return await ticketModel.create(ticket);
    };
};