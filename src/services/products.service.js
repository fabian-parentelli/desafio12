import ProductRepository from '../repsitories/products.repository.js';
import {
    SortNotFound, ThisPageNoExist, ProductNotFound,
    IncompleteValue, TheCodeIsRepeted, DontHavePermission
} from '../utils/custom-exceptions.js';

const productManager = new ProductRepository();

const getAllProducts = async (limit, page, query, sort) => {
    if (sort) if (sort !== 'desc' && sort !== 'asc') throw new SortNotFound('This sort no exist');

    let queryObj;
    if (!isNaN(query)) {
        queryObj = query ? { stock: { $lte: query } } : {};
    } else {
        queryObj = query ? { category: { $regex: query, $options: "i" } } : {};
    };

    let sortResult;
    if (sort === 'asc') {
        sortResult = { price: 1 };
    } else if (sort === 'desc') {
        sortResult = { price: -1 };
    } else {
        sortResult = {};
    };

    const products = await productManager.getAll(limit, page, queryObj, sortResult);
    if (page > products.totalPages || page <= 0) throw new ThisPageNoExist('This page no exist');
    const url = '/api/products?'
    products.prevLink = products.hasPrevPage ? `${url}page=${products.prevPage}` : null;
    products.nextLink = products.hasNextPage ? `${url}page=${products.nextPage}` : null;

    return products ? { status: 'sucsess', payload: products } : [];
};

const getProductById = async (id) => {
    const result = await productManager.getById(id);
    if (!result) throw new ProductNotFound('Product not found');
    return { status: 'success', payload: result };
};

const saveProducts = async (product, user) => {
    const { title, description, code, price, stock, category } = product;

    if (!title || !description || !code || !price || !stock || !category) {
        throw new IncompleteValue('Incomplete Value');
    };

    const codeSearch = await productManager.getByCode(code);
    if (codeSearch.length) throw new TheCodeIsRepeted('The code is repeted');

    product.owner = user._id;
    const result = await productManager.save(product);
    return { status: 'success', payload: result };
};

const modifyProducts = async (id, product, user) => {
    const { title, description, code, price, stock, category } = product;

    if (!title || !description || !code || !price || !stock || !category) {
        throw new IncompleteValue('Incomplete Value');
    };

    if (user.role === 'premium') {
        const resultProduct = await productManager.getById(id);
        if (resultProduct.owner.toString() != user._id) {
            throw new DontHavePermission("You don't have permissions to perfomr this action");
        };
    };

    const result = await productManager.updateById(id, product);
    return { status: 'success', payload: result };
};

const deleteProductsById = async (id, user) => {
    if (user.role === 'premium') {
        const resultProduct = await productManager.getById(id);
        if (resultProduct.owner.toString() !== user._id) {
            throw new DontHavePermission("You don't have permissions to perfomr this action");
        };
    };

    const result = await productManager.deleteById(id);
    if (!result) throw new ProductNotFound('Product not found');
    return { status: 'success', payload: result };
};

export { saveProducts, getAllProducts, getProductById, modifyProducts, deleteProductsById };