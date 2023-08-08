import { generateProducts } from "../utils/utils.js";

let products = [];

const getMocksProductsService = async () => {
    for (let i = 0; i < 100; i++) {
        products.push(generateProducts());
    };
    return { status: 'success', payload: products };
};

const saveMocksProductsService = async (product) => {
    if(products.length === 0) {
        product.id = 1;
    } else {
        product.id = products[products.length - 1].id + 1;
    };

    products.push(product);
    return product;
};

export { getMocksProductsService, saveMocksProductsService };