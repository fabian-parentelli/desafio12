import * as chatService from '../services/chats.service.js';

const saveChat = async (req, res) => {
    const io = req.app.get('socketio');
    const { user, message } = req.body;
    await chatService.saveMessage(user, message);
    res.sendSuccess({...req.body});
    const messages = await chatService.getMessage();
    io.emit('messageLogs', messages);
};

export default saveChat;