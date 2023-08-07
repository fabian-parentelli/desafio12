import { CHAT_DAO } from '../dao/index.js';

export default class ChatRepository {

    constructor() { };

    saveChat = async (userChat) => {
        const result = await CHAT_DAO.saveChat(userChat)
        return result;
    };

    getChat = async () => {
        const result = await CHAT_DAO.getChat();
        return result;
    };
};