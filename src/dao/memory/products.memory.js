import fs from 'fs';

export default class Product {

    constructor() {
        this.path = './src/dao/memory/files/products.json';
    };

    save = async (product) => {

        const products = await this.#getall();

        const newProduct = {
            title: product.title,
            description: product.description,
            code: product.code,
            price: Number(product.price),
            stock: Number(product.stock),
            category: product.category,
            thumbnails: [product.thumbnails],
            satatus: product.satatus
        };

        if (products.length === 0) {
            newProduct.id = 1
        } else {
            newProduct.id = products[products.length - 1].id + 1;
        };

        products.push(newProduct);

        await fs.promises.writeFile(this.path, JSON.stringify(products, null, `\t`));
        return product;
    };

    getAll = async (limit, page, queryObj, sortResult) => {
        if (fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const products = JSON.parse(data);
            return getProducts(limit, page, sortResult, queryObj, products);
        } else { [] };
    };

    #getall = async () => {
        if (fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const products = JSON.parse(data);
            return products;
        } else { [] };
    };

    getById = async (id) => {
        const products = await this.#getall();
        const product = products.find(prod => prod.id === id);
        if (!product) return null;
        return product;
    };

    getByCode = async (code) => {
        const products = await this.#getall();
        const product = products.find(prod => prod.code === code);
        if (!product) return null;
        return product;
    };

    updateById = async (id, product) => {
        const products = await this.#getall();
        const wantedProduct = await this.getById(id);
        const newProduct = { ...wantedProduct, ...product };
        const indexProducts = products.findIndex(prod => prod.id === id);
        products.splice(indexProducts, 1);

        products.push(newProduct);
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
        return newProduct;
    };

    deleteById = async (id) => {
        const products = await this.#getall();
        const wantedProduct = products.findIndex(prod => prod.id === id);
        if (!wantedProduct) return null
        products.splice(wantedProduct, 1);
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
        return wantedProduct;
    };
};

function getProducts(limit, page, sortResult, queryObj, products) {

    let result = products;

    if (queryObj) {
        if (!isNaN(queryObj)) {
            result.filter(pro => pro.stock > 0);
        } else {
            result.filter(pro => pro.category === queryObj);
        };
    };

    if (sortResult && sortResult.price) {
        const order = sortResult.price === 1 ? 1 : -1;
        result.sort((a, b) => (a.price - b.price) * order);
    };

    if (limit && page) {
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        result = result.slice(startIndex, endIndex);
    };

    return result;
};