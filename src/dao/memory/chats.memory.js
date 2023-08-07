import fs from 'fs';

export default class ChatDao {

    constructor() { this.path = './src/dao/memory/files/chats.json' };

    saveChat = async (userChat) => {
        const messages = await this.getChat();

        if (messages.length === 0) {
            userChat.id = 1
        } else {
            userChat.id = messages[messages.length - 1].id + 1;
        };

        messages.push(userChat);
        await fs.promises.writeFile(this.path, JSON.stringify(messages, null, '\t'));
        return messages;
    };

    getChat = async () => {
        if (fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const chat = JSON.parse(data);
            return chat;
        } else {
            { [] };
        };
    };
};