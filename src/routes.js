import { Router } from 'express';
import multer from 'multer';
import multerConfig from '../src/config/multer';
import authMiddlewares from '../src/middlewares/auth';

import UserController from './app/controllers/UserController';
import SectionController from './app/controllers/SectionController';
import ProductController from './app/controllers/ProductController';
import authMiddlewares from './middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sections', SectionController.store);

routes.use(authMiddlewares);

routes.post('/products', upload.single('file'), ProductController.store);
routes.get('/products', ProductController.index);

export default routes;
