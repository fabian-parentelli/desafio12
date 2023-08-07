import { Router } from 'express';
import { getMocksProductsController,saveMocksProductsController} from "../controllers/mocks.controller.js";
import toAsyncRouter from 'async-express-decorator';

const router = toAsyncRouter(Router());

router.get('/', getMocksProductsController)
router.post('/', saveMocksProductsController);

export default router;