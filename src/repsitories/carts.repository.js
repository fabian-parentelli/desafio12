import { CARTS_DAO } from '../dao/index.js';

export default class CartRepository {

    constructor() { this.dao = CARTS_DAO };

    save = async (cart) => {
        const result = await this.dao.save(cart);
        return result;
    };

    getById = async (id) => {
        const result = await this.dao.getById(id)
        return result;
    };

    addProductToCart = async (cid, cart) => {
        const result = await this.dao.addProductToCart(cid, cart)
        return result;
    };

    deleteProduct = async (cid, pid) => {
        const result = await this.dao.deleteProduct(cid, pid);
        return result;
    };

    updateProductsDao = async (cid, product) => {
        const result = await this.dao.updateProductsDao(cid, product);
        return result;
    };

    updateQuantityDao = async (cid, pid, quantity) => {
        const result = await this.dao.updateQuantityDao(cid, pid, quantity);
        return result;
    };

    deleteAllProductDao = async (cid) => {
        const result = await this.dao.deleteAllProductDao(cid);
        return result;
    };
};