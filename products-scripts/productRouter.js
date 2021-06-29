import Router from "express";
import ProductController from "./productController.js" 

const productRouter = new Router()

productRouter.post('/products', ProductController.create);
// productRouter.get('/news', ProductController.getAll);
productRouter.get('/products', ProductController.getAll);
productRouter.get('/getLastProduct', ProductController.getLastPost);
productRouter.get('/products/:id', ProductController.getOne);
productRouter.put('/products', ProductController.update);
productRouter.delete('/products/:id', ProductController.delete);

export default productRouter;