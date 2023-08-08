import CartRepository from '../repsitories/carts.repository.js';
import ProductRepository from '../repsitories/products.repository.js';
import { save } from './tickets.service.js';
import { CartNotFound } from '../utils/custom-exceptions.js';

const cartManager = new CartRepository();
const productManager = new ProductRepository();

const saveCart = async () => {
    const cart = await cartManager.save({ product: [] });
    return cart;
};

const getByIdCarts = async (id) => {
    const cart = await cartManager.getById(id);
    if (!cart) throw new CartNotFound('Cart not found');
    return cart;
};

const addProductToCarts = async (cid, pid) => {
    const preCart = await cartManager.getById(cid);
    const product = await productManager.getById(pid);
    const cart = preCart[0];

    const exist = cart.products.findIndex(pro => pro.product._id.toString() === product._id.toString());

    if (exist !== -1) {
        cart.products[exist].quantity++;
    } else {
        cart.products.push({ product: product._id });
    };

    const result = await cartManager.addProductToCart(cid, cart);
    if (!result) throw new CartNotFound('Cart not found');
    return result;
};

const deleteProduct = async (cid, pid) => {
    const result = await cartManager.deleteProduct(cid, pid);
    if (!result) throw new CartNotFound('Cart not found');
    return result;
};

const updateProduct = async (cid, product) => {
    const result = await cartManager.updateProductsDao(cid, product);
    if (!result) throw new CartNotFound('Cart not found');
    return result;
};

const updateQuantity = async (cid, pid, quantity) => {
    const result = await cartManager.updateQuantityDao(cid, pid, quantity);
    if (!result) throw new CartNotFound('Cart not found');
    return result;
};

const deleteAllProducts = async (cid) => {
    const result = await cartManager.deleteAllProductDao(cid);
    if (!result) throw new CartNotFound('Cart not found');
    return result;
};

const purchase = async (cid, user) => {

    const preCart = await cartManager.getById(cid);
    if (!preCart) throw new CartNotFound('Cart not found');
    const cart = preCart.pop();

    if (cart.products.length > 0) {
        let amount = 0;
        const outStock = [];

        cart.products.forEach(async ({ product, quantity }) => {
            if (product.stock >= quantity) {
                amount += product.price * quantity;
                product.stock -= quantity;
                await productManager.updateById(product._id, product);
            } else {
                outStock.push({ product, quantity });
            };
        });

        if (amount > 0) {
            const ticket = await save(user, amount);
            const payload = await cartManager.updateProductsDao(cid, outStock);
            return { ticket, payload, outStock };
        } else {
            return { status: 'error', outStock };
        };
    };
};

export { 
    saveCart, 
    getByIdCarts, 
    addProductToCarts, 
    deleteProduct, 
    updateProduct, 
    updateQuantity, 
    deleteAllProducts, 
    purchase 
};