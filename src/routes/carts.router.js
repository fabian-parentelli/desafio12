import Router from './router.js';
import * as  cartController  from '../controllers/carts.controller.js';
import { passportEnum } from '../config/enums.config.js';

export default class CartsRouter extends Router {
    init() {
        this.post('/', ['PUBLIC'], passportEnum.NOTHING, cartController.createCart);
        this.get('/:cid', ['PUBLIC'], passportEnum.NOTHING, cartController.getByIdCart);
        this.post('/:cid/products/:pid', ['USER'], passportEnum.JWT, cartController.productToCart);
        this.delete('/:cid/products/:pid', ['PUBLIC'], passportEnum.NOTHING, cartController.removeProduct);
        this.put('/:cid', ['PUBLIC'], passportEnum.NOTHING, cartController.modifyCart);
        this.put('/:cid/products/:pid', ['PUBLIC'], passportEnum.NOTHING, cartController.modifyQuantity);
        this.delete('/:cid', ['PUBLIC'], passportEnum.NOTHING, cartController.eliminateAllProducts);
        this.post('/:cid/purchase', ['USER'], passportEnum.JWT, cartController.purchase);
    };
};