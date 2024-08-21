import { Router } from "express";
import multer from "multer";
import multerConfig from "../config/multer";
import authMiddlewares from "../src/middlewares/auth";

import UserController from "./app/controllers/UserController";
import SectionController from "./app/controllers/SectionController";
import ProductController from "./app/controllers/ProductController";
import authMiddlewares from "./middlewares/auth";
import CategoryController from "./app/controllers/CategoryController";
import OrderController from "./app/controllers/OrderController";

const routes = new Router();
const upload = multer(multerConfig);

routes.post("/users", UserController.store);
routes.post("/sections", SectionController.store);

routes.use(authMiddlewares);
routes.post("/products", upload.single("file"), ProductController.store);
routes.get("/products", ProductController.index);

routes.post("/categories", CategoryController.store);
routes.get("/categories", CategoryController.index);

routes.post("/orders", OrderController.store);

export default routes;
