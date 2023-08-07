import Router from "./router.js";
import saveChat from '../controllers/chats.controller.js';
import { passportEnum } from "../config/enums.config.js";

export default class ChatRouter extends Router {

    init() {
        this.post('/', ['USER'], passportEnum.JWT, saveChat);
    };
};