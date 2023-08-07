import CustomError from '../middlewares/errors/CustomError.js';
import enumErrors from '../middlewares/errors/enums.js';
import { generateProductInfo } from '../middlewares/errors/info.js';
import { getMocksProductsService, saveMocksProductsService } from '../services/mocks.service.js';

const getMocksProductsController = async (req, res) => {
    const result = await getMocksProductsService();
    res.send(result.payload)
};

const saveMocksProductsController = async (req, res) => {
    const { title, description, code, price, stock, category, thumbnails, status } = req.body;

    if(!title || !description || !code || !price || !stock || !category || !thumbnails || !status) {
        throw CustomError.createError({
            name: 'ProductError',
            cause: generateProductInfo({
                title, description, code, price, stock, category, thumbnails, status
            }),
            message: 'Error trying to create Product',
            code: enumErrors.INVALID_TYPE_ERROR
        });
    };

    const product = { ...req.body };
    const result = await saveMocksProductsService(product);
    res.send(result);
};

export { getMocksProductsController, saveMocksProductsController };