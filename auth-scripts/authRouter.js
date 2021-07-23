import Router from 'express';

const router = new Router();
import controller from './authContorller.js'
import {check} from 'express-validator'
// import authMiddleWare from '../middleware/authMiddleWare.js'  
// import roleMiddleWare from '../middleware/roleMiddleWare.js'
router.post('/registration', [
    check('email', 'Введите корректный Email').notEmpty().isEmail(),
    check('password', 'Пароль не может быть короче 4, и не длиннее 10 символов').isLength({min: 4, max: 10})
], controller.registration);
router.post('/login', controller.login);
router.get('/users',  controller.getUsers);
router.post('/delete', controller.deleteUser);
router.put('/users', controller.update);

// roleMiddleWare(['ADMIN'])

export default router;