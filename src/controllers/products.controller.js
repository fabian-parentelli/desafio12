import * as productService from '../services/products.service.js';
import { logger } from '../middlewares/loggs/logger.js';
import { 
    SortNotFound, ThisPageNoExist, ProductNotFound, IncompleteValue, 
    TheCodeIsRepeted, DontHavePermission 
} from '../utils/custom-exceptions.js';

const getAllProdducts = async (req, res) => {
    const { limit = 10, page = 1, query = false, sort } = req.query;
    try {
        const result = await productService.getAllProducts(limit, page, query, sort);
        res.sendSuccess(result.payload);
    } catch (error) {
        logger.error(error.message);
        if (error instanceof SortNotFound) res.sendClientError(error.message);
        if (error instanceof ThisPageNoExist) res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const getByIdProduct = async (req, res) => {
    const { pid } = req.params;
    try {
        const result = await productService.getProductById(pid);
        res.sendSuccess(result.payload);
    } catch (error) {
        logger.error(error.message);
        if (error instanceof ProductNotFound) res.sendClientError(error.message);
        if (error instanceof DontHavePermission) res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const createProduct = async (req, res) => {
    const { user } = req.user;
    try {
        const result = await productService.saveProducts({ ...req.body }, user);
        res.sendSuccess(result.payload);
    } catch (error) {
        logger.error(error.message);
        if (error instanceof IncompleteValue) res.sendClientError(error.message);
        if (error instanceof TheCodeIsRepeted) res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const modifyProduct = async (req, res) => {
    const { pid } = req.params;
    const { user } = req.user;
    try {
        const result = await productService.modifyProducts(pid, { ...req.body }, user);
        res.sendSuccess(result.payload);
    } catch (error) {
        logger.error(error.message);
        if (error instanceof IncompleteValue) res.sendClientError(error.message);
        if (error instanceof DontHavePermission) res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

const deleteProduct = async (req, res) => {
    const { pid } = req.params;
    const { user } = req.user;
    try {
        const result = await productService.deleteProductsById(pid, user);
        res.sendSuccess(result.payload);
    } catch (error) {
        logger.error(error.message);
        if (error instanceof DontHavePermission) res.sendClientError(error.message);
        if (error instanceof ProductNotFound) res.sendClientError(error.message);
        res.sendServerError(error.message);
    };
};

export { getAllProdducts, getByIdProduct, createProduct, modifyProduct, deleteProduct };