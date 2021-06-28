import Router from "express";
import PostController from "./postController.js" 

const router = new Router()

router.post('/posts', PostController.create);
// router.get('/news', PostController.getAll);
router.get('/news', PostController.getSomePosts);
router.get('/posts/:id', PostController.getOne);
router.put('/posts', PostController.update);
router.delete('/posts/:id', PostController.delete);

export default router;