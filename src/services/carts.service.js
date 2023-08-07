import CartRepository from '../repsitories/carts.repository.js';
import ProductRepository from '../repsitories/products.repository.js';
import { save } from './tickets.service.js';

const cartManager = new CartRepository();
const productManager = new ProductRepository();

const saveCart = async () => {
    const cart = await cartManager.save({ product: [] });
    return cart;
};

const getByIdCarts = async (id) => {
    const cart = await cartManager.getById(id);
    return cart ? cart : { status: 'error', error: 'Cart not found' };
};

const addProductToCarts = async (cid, pid) => {
    try {
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
        return result ? result : { status: 'error', error: 'Cart not found' };
    } catch (error) {
        console.error(error);
    };
};

const deleteProduct = async (cid, pid) => {
    try {
        const result = await cartManager.deleteProduct(cid, pid);
        return result ? result : { status: 'error', error: 'Cart not found' };
    } catch (error) {
        console.error(error);
    };
};

const updateProduct = async (cid, product) => {
    try {
        const result = await cartManager.updateProductsDao(cid, product);
        return result ? result : { status: 'error', error: 'Cart not found' };
    } catch (error) {
        console.error(error);
    };
};

const updateQuantity = async (cid, pid, quantity) => {
    try {
        const result = await cartManager.updateQuantityDao(cid, pid, quantity);
        return result ? result : { status: 'error', error: 'Cart not found' };
    } catch (error) {
        console.error(error);
    };
};

const deleteAllProducts = async (cid) => {
    try {
        const result = await cartManager.deleteAllProductDao(cid);
        return result ? result : { status: 'error', error: 'Cart not found' };
    } catch (error) {
        console.error(error);
    };
};

const purchase = async (cid, user) => {

    const preCart = await cartManager.getById(cid);
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
            return { ticket, payload, outStock }
        } else {
            return { status: 'error', outStock };
        }
    };
};

export { saveCart, getByIdCarts, addProductToCarts, deleteProduct, updateProduct, updateQuantity, deleteAllProducts, purchase };