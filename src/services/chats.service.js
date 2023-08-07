import ChatRepository from "../repsitories/chats.repository.js";

const chatRepository = new ChatRepository();

const saveMessage = async (user, message) => {
    const userChat = {
        user: user,
        message,
    };

    const result = await chatRepository.saveChat(userChat);
    return result;
};

const getMessage = async () => {
    const result = await chatRepository.getChat();
    return result;
};

export { saveMessage, getMessage };