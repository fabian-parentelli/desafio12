import { productModel } from '../models/products.model.js';

export default class Product {

    constructor() {};

    save = async (product) => {
        return await productModel.create(product);
    };

    getAll = async (limit, page, queryObj, sortResult) => {
        return await productModel.paginate(queryObj, { limit, page, lean: true, sort: sortResult });
    };

    getById = async (id) => {
        return await productModel.findOne({ _id: id }).lean();
    };

    getByCode = async (code) => {
        return await productModel.find({ code: code });
    };

    updateById = async (id, product) => {
        return await productModel.updateOne({ _id: id }, product);
    };

    deleteById = async (id) => {
        return await productModel.deleteOne({ _id: id });
    };
};