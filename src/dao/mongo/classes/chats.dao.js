import { chatModel } from '../models/chats.model.js';

export default class ChatDao {

    constructor() { };

    saveChat = async (userChat) => {
        return await chatModel.create(userChat);
    };

    getChat = async () => {
        return await chatModel.find().lean();
    };
};