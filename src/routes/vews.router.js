import Router from "./router.js";
import * as vewController from '../controllers/vews.controller.js';
import { passportEnum } from "../config/enums.config.js";

export default class VewsRouter extends Router {
    init() {
        this.get('/chat', ['PUBLIC'], passportEnum.NOTHING, vewController.chatVew);
        this.get('/login', ['PUBLIC'], passportEnum.NOTHING, vewController.login);
        this.get('/', ['PUBLIC'], passportEnum.NOTHING, vewController.index);
        this.get('/register', ['PUBLIC'], passportEnum.NOTHING, vewController.register);
        this.get('/products', ['PUBLIC'], passportEnum.NOTHING, vewController.products);
        this.get('/carts/:cid', ['PUBLIC'], passportEnum.NOTHING, vewController.cart);
        this.get('/password/:uid', ['PUBLIC'], passportEnum.NOTHING, vewController.password);
        this.get('/whatemail', ['PUBLIC'], passportEnum.NOTHING, vewController.whatEmail);
    };
};