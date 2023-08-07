import fs from 'fs';
import Product from './products.memory.js';

const productmanager = new Product();

export default class Cart {

    constructor() {
        this.path = './src/dao/memory/files/carts.json';
    };

    #getAll = async () => {
        if (fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, 'utf8');
            const carts = JSON.parse(data);
            return carts;
        } else {
            return [];
        };
    };

    save = async (cart) => {
        const carts = await this.#getAll()
        if (carts.length === 0) {
            cart._id = 1;
        } else {
            cart._id = carts[carts.length - 1]._id + 1;
        };
        carts.push(cart)
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
        return cart;
    };

    getById = async (id) => {
        const carts = await this.#getAll();
        const cart = carts.find(car => car._id == id);
        if (!cart) return null;
        return cart;
    };

    #updateCart = async (id, obj) => {
        const carts = await this.#getAll();
        const wantedCart = await this.getById(id);

        const cart = { ...wantedCart, ...obj };

        const indexcart = carts.findIndex(car => car._id === id);
        carts.splice(indexcart, 1);

        carts.push(cart);
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
        return cart;
    };

    addProductToCart = async (cid, cart) => {
        const update = await this.#updateCart(cid, cart)
        return update;
    };

    deleteProduct = async (cid, pid) => {
        const cart = await this.getById(cid);
        const product = await productmanager.getById(pid);
        const exist = cart.products.findIndex(pro => pro.product.id === product.id);
        if (exist != -1) {
            cart.products.splice(exist, 1);
            return await this.#updateCart(cid, cart);
        } else return null;
    };

    updateProductsDao = async (cid, product) => {
        const cart = await this.getById(cid);
        const exist = cart.products.findIndex(pro => pro.product.id === product.id);
        if (exist !== -1) cart.products[exist] = product;
        return await this.#updateCart(cid, cart);
    };

    updateQuantityDao = async (cid, pid, quantity) => {
        const cart = await this.getById(cid);
        const exist = cart.products.findIndex(pro => pro.product.id === pid);
        if(exist != -1) cart.products[exist].quantity++;
        return await this.#updateCart(cid, cart);
    };

    deleteAllProductDao = async (cid) => {
        const cart = await this.getById(cid);
        if(!cart) return { status: 'error', error: 'Cart not found' };
        cart.products = [];
        return cart;
    };
};