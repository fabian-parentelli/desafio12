import { PRODUCTS_DAO } from '../dao/index.js';

export default class ProductRepository {

    constructor() { this.dao = PRODUCTS_DAO };

    save = async (product) => {
        const result = await this.dao.save(product);
        return result;
    };

    getAll = async (limit, page, queryObj, sortResult) => {
        const result = await this.dao.getAll(limit, page, queryObj, sortResult);
        return result;
    };

    getById = async (id) => {
        const result = await this.dao.getById(id)
        return result;
    };

    getByCode = async (code) => {
        const result = await this.dao.getByCode(code);
        return result;
    };

    updateById = async (id, product) => {
        const result = await this.dao.updateById(id, product)
        return result;
    };

    deleteById = async (id) => {
        const result = await this.dao.deleteById(id);
    };
};